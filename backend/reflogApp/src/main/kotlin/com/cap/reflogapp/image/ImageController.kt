package com.cap.reflogapp.image

import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/image")
class ImageController(
    private val imageService: ImageService
) {

    @PostMapping("/upload")
    fun uploadImage(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("category") category: String
    ): Map<String, String> {
        val imageUrl = imageService.uploadImage(file, category)
        return mapOf("url" to imageUrl)
    }
}
