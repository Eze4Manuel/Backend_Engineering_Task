"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualCall = exports.ContractConsultant = exports.TeamHireProject = exports.SingleSourceTask = void 0;
class SingleSourceTask {
    constructor(project_title, thematic_area, years_of_experience, consultant_archetype, project_details, client_id, status, documents = [], created_at = new Date(), updated_at = new Date()) {
        this.project_title = project_title;
        this.thematic_area = thematic_area;
        this.years_of_experience = years_of_experience;
        this.consultant_archetype = consultant_archetype;
        this.project_details = project_details;
        this.client_id = client_id;
        this.status = status;
        this.documents = documents;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    /* Returns the user */
    getObject() {
        return {
            project_title: this.project_title,
            thematic_area: this.thematic_area,
            years_of_experience: this.years_of_experience,
            consultant_archetype: this.consultant_archetype,
            project_details: this.project_details,
            client_id: this.client_id,
            status: this.status,
            documents: this.documents,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
exports.SingleSourceTask = SingleSourceTask;
class TeamHireProject {
    constructor(project_title, thematic_area, client_budget, start_date, project_duration, project_details, consultant_project_location = 'yes', client_id, status, documents = [], virtual_call = [], created_at = new Date(), updated_at = new Date()) {
        this.project_title = project_title;
        this.thematic_area = thematic_area;
        this.client_budget = client_budget;
        this.start_date = start_date;
        this.project_duration = project_duration;
        this.project_details = project_details;
        this.consultant_project_location = consultant_project_location;
        this.client_id = client_id;
        this.status = status;
        this.documents = documents;
        this.virtual_call = virtual_call;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    /* Returns the user */
    getObject() {
        return {
            project_title: this.project_title,
            thematic_area: this.thematic_area,
            client_budget: this.client_budget,
            start_date: this.start_date,
            project_duration: this.project_duration,
            project_details: this.project_details,
            consultant_project_location: this.consultant_project_location,
            client_id: this.client_id,
            status: this.status,
            documents: this.documents,
            virtual_call: this.virtual_call,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
exports.TeamHireProject = TeamHireProject;
class ContractConsultant {
    constructor(project_title, thematic_area, years_of_experience, consultant_designation, project_location, project_details, consultant_duration, commitment_level, work_type, start_date, client_budget, client_id, status, documents = [], created_at = new Date(), updated_at = new Date()) {
        this.project_title = project_title;
        this.thematic_area = thematic_area;
        this.years_of_experience = years_of_experience;
        this.consultant_designation = consultant_designation;
        this.project_location = project_location;
        this.project_details = project_details;
        this.consultant_duration = consultant_duration;
        this.commitment_level = commitment_level;
        this.work_type = work_type;
        this.start_date = start_date;
        this.client_budget = client_budget;
        this.client_id = client_id;
        this.status = status;
        this.documents = documents;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    /* Returns the user */
    getObject() {
        return {
            project_title: this.project_title,
            thematic_area: this.thematic_area,
            years_of_experience: this.years_of_experience,
            consultant_designation: this.consultant_designation,
            project_location: this.project_location,
            project_details: this.project_details,
            consultant_duration: this.consultant_duration,
            commitment_level: this.commitment_level,
            work_type: this.work_type,
            start_date: this.start_date,
            client_budget: this.client_budget,
            client_id: this.client_id,
            status: this.status,
            documents: this.documents,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
exports.ContractConsultant = ContractConsultant;
class VirtualCall {
    constructor(meeting_id, link, title, status = 'pending', created_at = new Date(), updated_at = new Date()) {
        this.meeting_id = meeting_id;
        this.link = link;
        this.title = title;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    /* Returns the user */
    getObject() {
        return {
            meeting_id: this.meeting_id,
            link: this.link,
            title: this.title,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
exports.VirtualCall = VirtualCall;
