

import { Request, Response, NextFunction } from 'express';
import { loginTemplate } from '../interfaces/authenticationTemplate';
import { validateEmail } from '../utils/validationUtil';
import { contractConsultantTemplate, createSourceTemplete, teamSourceProjectTemplate } from '../interfaces/consultantTemplate';


exports.validateCreateSourceTask = (req: any, res: Response, next: NextFunction) => {

    let createSourceTask: createSourceTemplete = req.body;

    // checking if input was inserted
    if (!createSourceTask.project_title) return res.status(400).json({ msg: 'project title required', status: 'failed' });

    // checking if input was inserted
    if (!createSourceTask.thematic_area) return res.status(400).json({ msg: 'thematic area required', status: 'failed' });

    // checking years_of_experience
    if (!createSourceTask.years_of_experience) {
        return res.status(400).json({ msg: 'years of experience required', status: 'failed' });
    }
    // checking password
    if (!createSourceTask.consultant_designation) {
        return res.status(400).json({ msg: 'consultant designation required', status: 'failed' });
    }
    // checking password
    if (!createSourceTask.project_details) {
        return res.status(400).json({ msg: 'project details required', status: 'failed' });
    }
    next();
};

exports.validateTeamSourceProject = (req: any, res: Response, next: NextFunction) => {

    req.body.values = JSON.parse(req.body.values);
    let teamSourceProject: teamSourceProjectTemplate = req.body.values;

    // checking if input was inserted
    if (!teamSourceProject.project_title) return res.status(400).json({ msg: 'project title is required', status: 'failed' });

    // checking if input was inserted
    if (!teamSourceProject.thematic_area) return res.status(400).json({ msg: 'thematic area required', status: 'failed' });

    // checking years_of_experience
    if (!teamSourceProject.client_budget) {
        return res.status(400).json({ msg: 'client budget is required', status: 'failed' });
    }
    // checking start_date
    if (!teamSourceProject.start_date) {
        return res.status(400).json({ msg: 'start date required', status: 'failed' });
    }
    // checking project_details
    if (!teamSourceProject.project_details) {
        return res.status(400).json({ msg: 'project_details required', status: 'failed' });
    }
    // checking project_duration
    if (!teamSourceProject.project_duration) {
        return res.status(400).json({ msg: 'project_duration required', status: 'failed' });
    }
    next();
};



exports.validateContractConsultant = (req: any, res: Response, next: NextFunction) => {

    let createSourceTask: contractConsultantTemplate = req.body;

    // checking if input was inserted
    if (!createSourceTask.project_title) return res.status(400).json({ msg: 'project title required', status: 'failed' });

    // checking if input was inserted
    if (!createSourceTask.thematic_area) return res.status(400).json({ msg: 'thematic area required', status: 'failed' });

    // checking years_of_experience
    if (!createSourceTask.years_of_experience) {
        return res.status(400).json({ msg: 'years of experience required', status: 'failed' });
    }
    // checking consultant_designation
    if (!createSourceTask.consultant_designation) {
        return res.status(400).json({ msg: 'consultant designation required', status: 'failed' });
    }
    // checking project_details
    if (!createSourceTask.project_details) {
        return res.status(400).json({ msg: 'project details required', status: 'failed' });
    }
    // checking project_location
    if (!createSourceTask.project_location) {
        return res.status(400).json({ msg: 'project details required', status: 'failed' });
    }
    // checking consultant_duration
    if (!createSourceTask.consultant_duration) {
        return res.status(400).json({ msg: 'project details required', status: 'failed' });
    }
    // checking commitment_level
    if (!createSourceTask.commitment_level) {
        return res.status(400).json({ msg: 'commitment level required', status: 'failed' });
    }
    // checking work_type
    if (!createSourceTask.work_type) {
        return res.status(400).json({ msg: 'work type required', status: 'failed' });
    }
    // checking start_date
    if (!createSourceTask.start_date) {
        return res.status(400).json({ msg: 'start date required', status: 'failed' });
    }
    // checking client_budget
    if (!createSourceTask.client_budget) {
        return res.status(400).json({ msg: 'client budget required', status: 'failed' });
    }
    // specifying the login mode
    next();
};








