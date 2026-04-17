import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();

/**
 * @openapi
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     description: Classifies a name using external APIs and stores the demographic data.
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileRequest'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/ProfileResponse'
 *       200:
 *         description: Profile already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Profile already exists"
 *                 data:
 *                   $ref: '#/components/schemas/ProfileResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       502:
 *         description: Upstream API failure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", ProfileController.createProfile);

/**
 * @openapi
 * /api/profiles:
 *   get:
 *     summary: Get all profiles
 *     description: Returns a list of profiles with optional filtering.
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: Filter by gender (male/female)
 *       - in: query
 *         name: country_id
 *         schema:
 *           type: string
 *         description: Filter by country ISO code (e.g., NG)
 *       - in: query
 *         name: age_group
 *         schema:
 *           type: string
 *         description: Filter by age group (child/teenager/adult/senior)
 *     responses:
 *       200:
 *         description: A list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProfileResponse'
 */
router.get("/", ProfileController.getAllProfiles);

/**
 * @openapi
 * /api/profiles/{id}:
 *   get:
 *     summary: Get a single profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/ProfileResponse'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", ProfileController.getProfile);

/**
 * @openapi
 * /api/profiles/{id}:
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: No content (Successfully deleted)
 *       404:
 *         description: Profile not found
 */
router.delete("/:id", ProfileController.deleteProfile);

export default router;
