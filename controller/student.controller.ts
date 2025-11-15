import type { NextFunction, Request, Response } from "express";
import { Student } from "../model/student.model.js";
import type { AddStudentDto, UpdateStudentDto } from "../dto/student.dto.js";
import { Op } from "sequelize";

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
      prev: page > 1 ? {page: page - 1, limit} : undefined,
      next: totalPage > page ? {page: page + 1, limit} : undefined,
      students,
    });
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
