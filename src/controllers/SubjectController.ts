import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subjectRepository";

interface IBodyProps {
    name: string
}

export class SubjectController {
    async create (req: Request<{}, {}, IBodyProps>, res: Response) {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({error: 'name field is required.'})
        }
        try {

            const newSubject = subjectRepository.create({ name })

            await subjectRepository.save(newSubject)

            return res.status(201).json({ newSubject })
            
        } catch (error) {
            return res.status(500).json({error: 'Could not create subject.'})
        }

    }
}