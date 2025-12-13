const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Generic ownership check middleware
 * @param {string} resource - resource name (e.g. 'member')
 * @param {string} paramIdName - param name (default 'id')
 */
function checkOwnership(resource, paramIdName = 'id') {
  return async (req, res, next) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      // ADMIN selalu boleh
      if (req.user.role === 'ADMIN') {
        return next();
      }

      const id = Number(req.params[paramIdName]);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid id'
        });
      }

      // Ownership check khusus Member
      if (resource === 'member') {
        const member = await prisma.member.findUnique({
          where: { id }
        });

        if (!member) {
          return res.status(404).json({
            success: false,
            message: 'Resource not found'
          });
        }

        if (member.userId === userId) {
          return next();
        }

        return res.status(403).json({
          success: false,
          message: 'Forbidden'
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    } catch (error) {
      console.error('Ownership middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
}

module.exports = checkOwnership;
