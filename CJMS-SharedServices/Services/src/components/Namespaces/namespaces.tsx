export const request_api_port = 2121;

export var request_api_location:string;
if (typeof window !== 'undefined') {
  request_api_location = `http://${window.location.hostname}:${request_api_port.toString()}/cjms_server`;
} else {
  request_api_location = `/cjms_server`;
}

export const request_api_location_fetch = `${request_api_location}/fetch`;
export const request_api_location_post = `${request_api_location}/post`;

// Users
export const request_post_user_login = `${request_api_location_post}/user/login`;
export const request_post_user_update = `${request_api_location_post}/user/update`;

// Clock/Timer
export const request_post_timer = `${request_api_location_post}/timer`;

// Setup
export const request_post_setup = `${request_api_location_post}/setup`;
export const request_post_purge = `${request_api_location_post}/purge`;

// Team Database
export const request_fetch_teams = `${request_api_location_fetch}/teams`;
export const request_post_team_score = `${request_api_location_post}/teams/score`;

// Judging Session Database
export const request_fetch_judging_sessions = `${request_api_location_fetch}/judging_sessions`;

// Event Database
export const request_fetch_event = `${request_api_location_fetch}/event`;

// Match Database
export const request_fetch_matches = `${request_api_location_fetch}/matches`;
export const request_post_match_load = `${request_api_location_post}/match/load`;
export const request_post_match_complete = `${request_api_location_post}/match/complete`;
export const request_post_match_update = `${request_api_location_post}/match/update`; // {match: number, update: {data...}}