import { IJudgingSession } from "@cjms_shared/services";
import mongoose from "mongoose";

export const JudgingSessionSchema = new mongoose.Schema<IJudgingSession>({
  // Session/Session Number
  session: {type: String},

  // Start/End Times
  start_time: {type: String},
  end_time: {type: String},

  // Room the session is held in
  room: {type: String},

  // Team number
  team_number: {type: String}
});

export const JudgingSessionModel = mongoose.model<IJudgingSession>('JudgingSession', JudgingSessionSchema);