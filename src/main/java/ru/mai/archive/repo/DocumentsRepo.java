package ru.mai.archive.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mai.archive.domain.Document;

import java.util.UUID;

public interface DocumentsRepo extends JpaRepository<Document, UUID> {


}
