import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";

interface IBodyPropsCreate {
    name: string
    description?: string
}

interface IBodyPropsCreateVideo {
    title: string,
    url: string
}

interface IParamsProps {
    idRoom: number
}

interface IBodyPropsSubject {
    subject_id: number
}

export class RoomController {
    async create (req: Request<{}, {}, IBodyPropsCreate>, res: Response) {
        try {
            const { name, description } = req.body;

            if (!name) {
                return res.status(400).json({error: 'name field is required.'})
            }

            const newRoom = roomRepository.create({name, description})
            await roomRepository.save(newRoom)
            return res.status(201).json(newRoom)

        } catch (error) {
            return res.status(500).json({error: 'Could not create room.'})
        }
    }

    async createVideo (req: Request<IParamsProps, {}, IBodyPropsCreateVideo>, res: Response) {
        try {

            const { title, url } = req.body
            const { idRoom } = req.params

            const room = await roomRepository.findOne({where: {id: Number(idRoom)}})

            if (!room) {
                return res.status(404).json({error: 'Room does not exist.'})
            }

            const newVideo = videoRepository.create({
                title,
                url,
                room
            })

            await videoRepository.save(newVideo)

            return res.status(201).json(newVideo)

        } catch (error) {
            return res.status(500).json({error: 'Could not create room.'})
        }
    }

    async roomSubject(req: Request<IParamsProps, {}, IBodyPropsSubject>, res: Response) {
        try {
            const { subject_id } = req.body
            const { idRoom } = req.params
            
            const room = await roomRepository.findOne({where: {id: Number(idRoom)}})

            if (!room) {
                return res.status(404).json({error: 'Room does not exist.'})
            }

            const subject = await subjectRepository.findOneBy({id: Number(subject_id)})

            if (!subject) {
                return res.status(404).json({error: 'Subject does not exist.'})
            }

            const roomUpdate = { ...room, subjects: [subject] }

            await roomRepository.save(roomUpdate)

            return res.status(200).json(room)
        
        } catch (error) {
            return res.status(500).json({error: 'Could not create room subject.'})
        }
        
    }

    async list(req: Request, res: Response) {
        try {
            const rooms = await roomRepository.find({
                relations: {
                    subjects: true
                }
            })

            return res.status(200).json(rooms)
        } catch (error) {
            return res.status(500).json({error: 'Could not list.'})           
        }
    }
    
}