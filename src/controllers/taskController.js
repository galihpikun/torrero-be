import { prisma } from "../config/db.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.Task.findMany();
    return res
      .status(200)
      .json({ code: 200, message: "Task berhasil ditemukan", data: tasks });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data",
    });
  }
};

export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
    
        const task = await prisma.task.findUnique({
          where: {
            id: parseInt(taskId),
          },
        });
    
        if (!task) {
          return res.status(404).json({
            code: 404,
            message: "Task tidak ditemukan",
          });
        }
    
        return res.status(200).json({
          code: 200,
          message: "Task berhasil ditemukan",
          data: task,
        });
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: error.message || "Terjadi kesalahan saat mengambil data",
        });
      }
}

export const createTask = async (req,res) => {
    try {
        const { title, status, priority, description, deadline } = req.body;
    
        if (!(title && status && priority && description && deadline)) {
          return res.status(400).json({
            code: 400,
            message:
              "Tolong lengkapi semua data (title, description, priority, deadline, status, user_id)",
          });
        }
    
        const task = await prisma.task.create({
          data: {
            title: title,
            status: status,
            priority: priority,
            description: description,
            deadline: deadline,
          },
        });
    
        return res.status(201).send({
          code: 201,
          message: "Task berhasil dibuat",
          data: task,
        });
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: error.message || "Terjadi kesalahan saat mengambil data",
        });
      }
}

export const editTask = async(req,res) => {
    try {
    const { taskId } = req.params;
    const { title, status, priority, description, deadline } = req.body;

    if (!(title && status && priority && description && deadline)) {
      return res.status(400).json({
        code: 400,
        message:
          "Tolong lengkapi semua data (title, desc, priority, deadline, status, user_id)",
      });
    }

    const taskExists = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });

    if (!taskExists) {
      return res.status(404).json({
        code: 404,
        message: "Task tidak ditemukan",
      });
    }

    const task = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        title: title,
        status: status,
        priority: priority,
        description: description,
        deadline: deadline,
      },
    });

    return res.status(200).json({
      code: 200,
      message: "task berhasil diupdate",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data",
    });
  }
}

export const deleteTask = async(req, res) => {
     try {
    const { taskId } = req.params;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });

    if (!taskExists) {
      return res.status(404).json({
        code: 404,
        message: "Task tidak ditemukan",
      });
    }

    const task = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      },
    });

    return res.status(200).json({
      code: 200,
      message: "task berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data",
    });
  }
}