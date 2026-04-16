import { Request, Response } from "express";
import { uuidv7 } from "uuidv7";
import prisma from "../lib/prisma";
import { ExternalApiService } from "../services/external-api.service";
import { determineAgeGroup, getTopCountry } from "../utils/classification";

export class ProfileController {
  static async createProfile(req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ status: "error", message: "Missing or empty name" });
      }

      if (typeof name !== "string") {
        return res.status(422).json({ status: "error", message: "Invalid type" });
      }

      // Idempotency: Check if profile already exists
      const existingProfile = await prisma.profile.findUnique({
        where: { name: name.toLowerCase() },
      });

      if (existingProfile) {
        return res.status(200).json({
          status: "success",
          message: "Profile already exists",
          data: existingProfile,
        });
      }

      // Fetch external data
      const { genderData, agifyData, nationalizeData } = await ExternalApiService.fetchProfileData(name);

      const topCountry = getTopCountry(nationalizeData.country);
      const ageGroup = determineAgeGroup(agifyData.age);

      const profile = await prisma.profile.create({
        data: {
          id: uuidv7(),
          name: name.toLowerCase(),
          gender: genderData.gender,
          gender_probability: genderData.probability,
          sample_size: genderData.count,
          age: agifyData.age,
          age_group: ageGroup,
          country_id: topCountry!.country_id,
          country_probability: topCountry!.probability,
        },
      });

      return res.status(201).json({
        status: "success",
        data: profile,
      });
    } catch (error: any) {
      if (error.status === 502) {
        return res.status(502).json({ status: "error", message: error.message });
      }
      return res.status(500).json({ status: "error", message: error.message || "Upstream or server failure" });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const profile = await prisma.profile.findUnique({ where: { id } });

      if (!profile) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }

      return res.status(200).json({
        status: "success",
        data: profile,
      });
    } catch (error: any) {
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }

  static async getAllProfiles(req: Request, res: Response): Promise<any> {
    try {
      const { gender, country_id, age_group } = req.query;

      const where: any = {};
      if (gender) where.gender = { equals: (gender as string).toLowerCase(), mode: 'insensitive' };
      if (country_id) where.country_id = { equals: (country_id as string).toUpperCase(), mode: 'insensitive' };
      if (age_group) where.age_group = { equals: (age_group as string).toLowerCase(), mode: 'insensitive' };

      const profiles = await prisma.profile.findMany({
        where,
        select: {
          id: true,
          name: true,
          gender: true,
          age: true,
          age_group: true,
          country_id: true,
        },
      });

      return res.status(200).json({
        status: "success",
        count: profiles.length,
        data: profiles,
      });
    } catch (error: any) {
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }

  static async deleteProfile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      
      const profile = await prisma.profile.findUnique({ where: { id } });
      if (!profile) {
        return res.status(404).json({ status: "error", message: "Profile not found" });
      }

      await prisma.profile.delete({ where: { id } });
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }
}
