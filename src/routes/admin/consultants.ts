
import express from 'express';
const { getAllSingleSourceTask, getAllTeamSourceProject, getAllContractConsultant, scheduleVirtualCall, removeVirtualCall, stopVirtualCall, addClientToPool, sendEmailTask } = require('../../controllers/admin/consultants/consultants');
const { auth } = require('../../middleware/auth');
const { validateScheduleVirtualCall } = require('../../middleware/adminConsultantValidation');

const router = express.Router();

function routes() {
    router.get('/get-all-single-source-task/', auth, getAllSingleSourceTask);
    router.get('/get-all-team-source-project/', auth, getAllTeamSourceProject);
    router.get('/get-all-contract-consultant/', auth, getAllContractConsultant);
    router.post('/schedule-virtual-call', auth, validateScheduleVirtualCall, scheduleVirtualCall);
    router.post('/remove-virtual-call', auth, removeVirtualCall);
    router.post('/stop-virtual-call', auth, stopVirtualCall);
    router.post('/add-client-to-pool', auth, addClientToPool);
    router.post('/send-task-email', auth, sendEmailTask);

    return router;
};

module.exports = routes;   