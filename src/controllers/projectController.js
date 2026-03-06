import { prisma } from "../config/db.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
        orderBy:{
            created_at:"desc"
        }
    });
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Projects berhasil di ambil",
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data projects",
    });
  }
};

export const getProjectById = async(req,res) => {
    try {
        const { projectId } = req.params;
    
        const project = await prisma.project.findUnique({
          where: {
            id: parseInt(projectId),
          },
        });
    
        if (!project) {
          return res.status(404).json({
            code: 404,
            message: "Project tidak ditemukan",
          });
        }
    
        return res.status(200).json({
          code: 200,
          message: "Project berhasil ditemukan",
          data: project,
        });
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: error.message || "Terjadi kesalahan saat mengambil data",
        });
      }
}

export const createProject = async(req,res) => {
     try {
        const { title } = req.body;
    
        if (!title) {
          return res.status(400).json({
            code: 400,
            message:
              "Tolong lengkapi input title",
          });
        }
    
        const project = await prisma.project.create({
          data: {
            title: title,
          },
        });
    
        return res.status(201).json({
          code: 201,
          message: "Project berhasil dibuat",
          data: project,
        });
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: error.message || "Terjadi kesalahan saat membuat data",
        });
      }
}

export const editProject = async(req,res) => {
    try {
    const { projectId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        code: 400,
        message:
          "Tolong lengkapi title",
      });
    }

    const projectExists = await prisma.project.findUnique({
      where: {
        id: parseInt(projectId),
      },
    });

    if (!projectExists) {
      return res.status(404).json({
        code: 404,
        message: "Project tidak ditemukan",
      });
    }

    const project = await prisma.project.update({
      where: {
        id: parseInt(projectId),
      },
      data: {
        title: title,
      },
    });

    return res.status(200).json({
      code: 200,
      message: "project berhasil diupdate",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat edit data",
    });
  }
}

export const deleteProject = async(req,res) => {
     try {
    const { projectId } = req.params;

    const projectExists = await prisma.project.findUnique({
      where: {
        id: parseInt(projectId),
      },
    });

    if (!projectExists) {
      return res.status(404).json({
        code: 404,
        message: "project tidak ditemukan",
      });
    }

    const project = await prisma.project.delete({
      where: {
        id: parseInt(projectId),
      },
    });

    return res.status(200).json({
      code: 200,
      message: "project berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data",
    });
  }
}