package ru.mai.archive.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "author")
    private String author;

    @Column(name = "name")
    private String name;

    @Column(name = "reg_date")
    private LocalDate regDate;

    @Column(name = "description")
    private String description;

    @Column(name = "ext")
    private String ext;

    @Column(name = "filename")
    private String filename;

    @Column(name = "size")
    private Long size;
}
