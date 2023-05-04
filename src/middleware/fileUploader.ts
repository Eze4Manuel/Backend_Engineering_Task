import express from 'express';
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile } = require('../utils/s3')

exports.handleFileUpload = async (req: any, res: any, next: any) => {
    const files = req.files;
    req.body.docs = []
    try {
        await Promise.all(files.map(async (file: any) => {
            const result = await uploadFile(file)
            await unlinkFile(file.path);
            req.body.docs.push({ location: result.Location, file_name: result.key })
        }))
        next();
    } catch (error) {
        next(error);
    }
}