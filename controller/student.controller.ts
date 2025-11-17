import type { NextFunction, Request, Response } from "express";
import { Student } from "../model/student.model.js";
import type { AddStudentDto, UpdateStudentDto } from "../dto/student.dto.js";
import { Op } from "sequelize";
import sequelize from "../config/db.js";

Student.sync({force: false})

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const offset = (page - 1) * limit;

    const search = (req.query.search as string)?.trim() || "";

    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { phone_number: { [Op.iLike]: `%${search}%` } },
          { profession: { [Op.iLike]: `%${search}%` } },
          { parent_name: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }
    const { count, rows: students } = await Student.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      raw: true,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      totalPage,
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: totalPage > page ? { page: page + 1, limit } : undefined,
      students,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getStudentsStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const statistics = await Student.findAll({where: {
      attribute: [
        [sequelize.literal(`DATE_TRUNC('month', 'joined_at')`), "month"],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_joined'],
        [sequelize.literal(`SUM(CASE WHEN 'left_at' IS NOT NULL THEN 1 ELSE 0 END)`), 'total_left']
      ],
      group: [sequelize.literal(`DATE_TRUNC('month', 'joined_at')`)],
      order: [sequelize.literal(`DATE_TRUNC('month', joined_at)`), 'ASC'] as any
    }})
  } catch (error: any) {
    next(error);
  }
};

export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_number,
      img_url,
    } = req.body as AddStudentDto;

    await Student.create({
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_number,
      img_url,
      joined_at: new Date(),
    });

    res.status(201).json({ message: "Added new student" });
  } catch (error: any) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const {
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_number,
      img_url,
    } = req.body as UpdateStudentDto;

    const foundedStudent = await Student.findByPk(id);

    if (!foundedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.update(
      {
        full_name,
        phone_number,
        profession,
        parent_name,
        parent_number,
        img_url,
      },
      { where: { id } }
    );

    res.status(201).json({ message: "Updated student" });
  } catch (error: any) {
    next(error);
  }
};

export const leftStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const foundedStudent = await Student.findByPk(id);

    if (!foundedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.update({left_at: new Date()}, { where: { id } });

    res.status(201).json({ message: "Left student" });
  } catch (error: any) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const foundedStudent = await Student.findByPk(id);

    if (!foundedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.destroy({ where: { id } });

    res.status(201).json({ message: "Deleted student" });
  } catch (error: any) {
    next(error);
  }
};
