
export class SingleSourceTask {
    constructor(
        readonly project_title: string,
        readonly thematic_area: string,
        readonly years_of_experience: string,
        readonly consultant_archetype: string,
        readonly project_details: string,
        readonly client_id: string,
        readonly status: string,
        readonly documents: Array<string> = [],
        readonly created_at: any = new Date(),
        readonly updated_at: any = new Date()
    ) { }

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
        }
    }
}


export class TeamHireProject {
    constructor(
        readonly project_title: string,
        readonly thematic_area: string,
        readonly client_budget: string,
        readonly start_date: string,
        readonly project_duration: string,
        readonly project_details: string,
        readonly consultant_project_location: string = 'yes',
        readonly client_id: string,
        readonly status: string,
        readonly documents: Array<string> = [],
        readonly virtual_call: Array<string> = [],
        readonly created_at: any = new Date(),
        readonly updated_at: any = new Date()
    ) { }
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
        }
    }
}



export class ContractConsultant {
    constructor(
        readonly project_title: string,
        readonly thematic_area: string,
        readonly years_of_experience: string,
        readonly consultant_designation: string,
        readonly project_location: string,
        readonly project_details: string,
        readonly consultant_duration: string,
        readonly commitment_level: string,
        readonly work_type: string,
        readonly start_date: string,
        readonly client_budget: string,
        readonly client_id: string,
        readonly status: string,
        readonly documents: Array<string> = [],
        readonly created_at: any = new Date(),
        readonly updated_at: any = new Date()
    ) { }
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
        }
    }
}



export class VirtualCall {
    constructor(
        readonly meeting_id: string,
        readonly link: string,
        readonly title: string,
        readonly status: string = 'pending',
        readonly created_at: any = new Date(),
        readonly updated_at: any = new Date()
    ) { }
    /* Returns the user */
    getObject() {
        return {
            meeting_id: this.meeting_id,
            link: this.link,
            title: this.title,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}



export class EmailMessage {
    constructor(
        readonly email_id: string,
        readonly subject: string,
        readonly message: string,
        readonly email: string,
        readonly status: string = 'pending',
        readonly created_at: any = new Date(),
        readonly updated_at: any = new Date()
    ) { }
    /* Returns the user */
    getObject() {
        return {
            email_id: this.email_id,
            subject: this.subject,
            message: this.message,
            email: this.email,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}


