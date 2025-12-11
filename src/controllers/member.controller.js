const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { parsePagination, buildListResponse } = require('../utils/pagination');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, membershipPlanId } = req.body;
    const userId = req.user ? req.user.userId : null;
    const member = await prisma.member.create({
      data: { fullName, email, phoneNumber, membershipPlanId, userId }
    });
    return success(res, 201, 'Member created', member);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.list = async (req, res) => {
  try {
    const { page, limit, skip, sortBy, order, search } = parsePagination(req.query);
    const where = { ...(req.query.planId ? { membershipPlanId: Number(req.query.planId) } : {}) };
    if (search) {
      where.OR = [{ fullName: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }];
    }
    const [totalRecords, data] = await Promise.all([
      prisma.member.count({ where }),
      prisma.member.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: { membershipPlan: true }
      })
    ]);
    return res.json(buildListResponse({ message: 'List members', data, totalRecords, page, limit }));
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const member = await prisma.member.findUnique({ where: { id }, include: { membershipPlan: true, bookings: { include: { gymClass: true } } } });
    if (!member) return error(res, 404, 'Not found');
    return success(res, 200, 'Member', member);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await prisma.member.update({ where: { id }, data });
    return success(res, 200, 'Member updated', updated);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.member.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};
