const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { parsePagination, buildListResponse } = require('../utils/pagination');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { name, description, scheduleTime, maxParticipants } = req.body;
    const gymClass = await prisma.gymClass.create({
      data: { name, description, scheduleTime: new Date(scheduleTime), maxParticipants }
    });
    return success(res, 201, 'Class created', gymClass);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.list = async (req, res) => {
  try {
    const { page, limit, skip, sortBy, order, search } = parsePagination(req.query);
    const where = {};
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }];
    if (req.query.date) {
      const start = new Date(req.query.date);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      where.scheduleTime = { gte: start, lt: end };
    }
    const [totalRecords, data] = await Promise.all([
      prisma.gymClass.count({ where }),
      prisma.gymClass.findMany({ where, skip, take: limit, orderBy: { [sortBy]: order } })
    ]);
    return res.json(buildListResponse({ message: 'List classes', data, totalRecords, page, limit }));
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const gc = await prisma.gymClass.findUnique({ where: { id }, include: { bookings: { include: { member: true } } } });
    if (!gc) return error(res, 404, 'Not found');
    return success(res, 200, 'Class', gc);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.gymClass.update({ where: { id }, data: req.body });
    return success(res, 200, 'Class updated', updated);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.gymClass.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};
