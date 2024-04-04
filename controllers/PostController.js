const prisma = require("../configs/prisma");

class UsersController {
  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        const user = await prisma.user.create({
          data: body,
        });

        return res.status(201).json(user);
      }

      return res.status(409).json({ message: "user already existe" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async show(req, res) {
    try {
      const id = Number(req.params.id);
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (e) {
      return res.json(user);
    }
  }

  async update(req, ret, res) {
    const id = Number(req.params.id);
    const body = ret.body;
    let user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user = await prisma.user.update({
      data: body,
    });

    return res.json(user);
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: "User deleted" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new UsersController();
