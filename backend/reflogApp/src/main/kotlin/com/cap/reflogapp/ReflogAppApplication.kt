package com.cap.reflogapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ReflogAppApplication

fun main(args: Array<String>) {
    runApplication<ReflogAppApplication>(*args)
}
