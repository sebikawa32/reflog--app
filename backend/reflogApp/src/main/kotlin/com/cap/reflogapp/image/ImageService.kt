package com.cap.reflogapp.image

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@Service
class ImageService {

    private val baseUploadDir: Path = Paths.get("src/main/resources/static/uploads")

    fun uploadImage(file: MultipartFile, category: String): String {
        // category = "profile" or "post"
        val uploadDir = baseUploadDir.resolve(category)
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir)
        }

        val fileName = "${UUID.randomUUID()}_${file.originalFilename}"
        val filePath = uploadDir.resolve(fileName)
        Files.copy(file.inputStream, filePath, StandardCopyOption.REPLACE_EXISTING)

        // 로컬 기준 URL 반환
        return "http://localhost:8080/uploads/$category/$fileName"
    }
}
