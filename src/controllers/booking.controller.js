const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { memberId, gymClassId } = req.body;

    const gc = await prisma.gymClass.findUnique({ where: { id: gymClassId }, include: { bookings: true } });
    if (!gc) return error(res, 404, 'Class not found');
    if (gc.bookings.length >= gc.maxParticipants) return error(res, 400, 'Class is full');

    // check existing booking using unique compound key
    const existing = await prisma.classBooking.findUnique({ where: { memberId_gymClassId: { memberId, gymClassId } } });
    if (existing) return error(res, 409, 'Already booked');

    const booking = await prisma.classBooking.create({ data: { memberId, gymClassId, status: 'CONFIRMED' } });
    return success(res, 201, 'Booking created', booking);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.list = async (req, res) => {
  try {
    const bookings = await prisma.classBooking.findMany({ include: { member: true, gymClass: true } });
    return success(res, 200, 'Bookings', bookings);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};

exports.cancel = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const booking = await prisma.classBooking.findUnique({ where: { id } });
    if (!booking) return error(res, 404, 'Not found');

    // owner check: the member's userId must match req.user.userId OR admin
    if (req.user.role !== 'ADMIN') {
      const member = await prisma.member.findUnique({ where: { id: booking.memberId } });
      if (!member) return error(res, 404, 'Member not found');
      if (member.userId !== req.user.userId) return error(res, 403, 'Forbidden');
    }

    const updated = await prisma.classBooking.update({ where: { id }, data: { status: 'CANCELLED' } });
    return success(res, 200, 'Booking cancelled', updated);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error');
  }
};
