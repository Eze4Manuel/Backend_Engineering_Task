
import { Request, Response, NextFunction } from 'express';


exports.validateScheduleVirtualCall = (req: any, res: Response, next: NextFunction) => {
    let teamSourceProject = req.body;

    // checking if input was inserted
    if (!teamSourceProject.title) return res.status(400).json({ msg: 'meeting title is required', status: 'failed' });

    // checking if input was inserted
    if (!teamSourceProject.meeting_link) return res.status(400).json({ msg: 'meeting link is required', status: 'failed' });
    // checking if input was inserted
    if (!teamSourceProject.task_id) return res.status(400).json({ msg: 'task id is required', status: 'failed' });
    // checking if input was inserted
    if (!teamSourceProject.task_type) return res.status(400).json({ msg: 'task type is required', status: 'failed' });

    next();
};