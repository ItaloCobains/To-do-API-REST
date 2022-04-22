import { Request, Response } from 'express';
import { TableHints } from 'sequelize/types';
import { Todo } from '../models/Todo'


export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json(list);
}

export const add = async (req: Request, res: Response) => {
    const { title, done } = req.body;

    const newtodo = await Todo.create({
        title,
        done
    })
    res.status(201)
    res.json({
        id: newtodo.id,
        title,
        done
    })
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, done } = req.body;

    const task = await Todo.findByPk(id);

    if (task) {
        task.title = title;
        task.done = done;
        await task.save();

        res.json(task);
    } else {
        res.json({ error: "Task not found" })
    }

}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Todo.findByPk(id);
    if (task) {
        task.destroy();
        task.save();
        res.json({delete: 'deletado com sucesso'});
    }else{
        res.json({error: "Task not found"})
    }

    
}