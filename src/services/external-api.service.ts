import axios from "axios";

export class ExternalApiService {
  static async fetchProfileData(name: string) {
    try {
      const [genderRes, agifyRes, nationalizeRes] = await Promise.all([
        axios.get(`https://api.genderize.io?name=${name}`),
        axios.get(`https://api.agify.io?name=${name}`),
        axios.get(`https://api.nationalize.io?name=${name}`),
      ]);

      const genderData = genderRes.data;
      const agifyData = agifyRes.data;
      const nationalizeData = nationalizeRes.data;

      // Edge Case Validations (MUST return 502 with specific message)
      if (!genderData.gender || genderData.count === 0) {
        throw {
          status: 502,
          message: "Genderize returned an invalid response",
        };
      }
      if (agifyData.age === null) {
        throw { status: 502, message: "Agify returned an invalid response" };
      }
      if (!nationalizeData.country || nationalizeData.country.length === 0) {
        throw {
          status: 502,
          message: "Nationalize returned an invalid response",
        };
      }

      return { genderData, agifyData, nationalizeData };
    } catch (error: any) {
      if (error.status === 502) throw error;
      throw { status: 500, message: "Upstream or server failure" };
    }
  }
}
