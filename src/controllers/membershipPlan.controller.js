const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { parsePagination, buildListResponse } = require('../utils/pagination');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { name, price, durationInDays, description } = req.body;
    const plan = await prisma.membershipPlan.create({
      data: { name, price, durationInDays, description }
    });
    return success(res, 201, 'Membership plan created', plan);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.list = async (req, res) => {
  try {
    const { page, limit, skip, sortBy, order, search } = parsePagination(req.query);
    const where = search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {};
    const [totalRecords, data] = await Promise.all([
      prisma.membershipPlan.count({ where }),
      prisma.membershipPlan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order }
      })
    ]);
    return res.json(buildListResponse({ message: 'List membership plans', data, totalRecords, page, limit }));
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const plan = await prisma.membershipPlan.findUnique({ where: { id } });
    if (!plan) return error(res, 404, 'Not found');
    return success(res, 200, 'Membership plan', plan);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await prisma.membershipPlan.update({ where: { id }, data });
    return success(res, 200, 'Membership plan updated', updated);
  } catch (err) {
    if (err.code === 'P2025') return error(res, 404, 'Not found');
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.membershipPlan.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};
