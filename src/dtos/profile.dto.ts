/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProfileRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name to classify
 *           example: "ella"
 *     
 *     ProfileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "019d9396-f2e2-7cd9-a220-b411a08ca19d"
 *         name:
 *           type: string
 *           example: "ella"
 *         gender:
 *           type: string
 *           example: "female"
 *         gender_probability:
 *           type: number
 *           example: 0.99
 *         sample_size:
 *           type: integer
 *           example: 1234
 *         age:
 *           type: integer
 *           example: 46
 *         age_group:
 *           type: string
 *           example: "adult"
 *         country_id:
 *           type: string
 *           example: "NG"
 *         country_probability:
 *           type: number
 *           example: 0.85
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Missing or empty name"
 */

export interface CreateProfileDto {
  name: string;
}

export interface ProfileDto {
  id: string;
  name: string;
  gender: string;
  gender_probability: number;
  sample_size: number;
  age: number;
  age_group: string;
  country_id: string;
  country_probability: number;
  created_at: Date;
}
