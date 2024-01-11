package ru.mai.archive.service;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import ru.mai.archive.generated.dto.DocumentDto;
import ru.mai.archive.generated.dto.DocumentFilter;
import ru.mai.archive.generated.dto.PagedDocs;

import java.util.UUID;

public interface DocumentsService {
    void delete(UUID id);

    StreamingResponseBody download(UUID id);

    DocumentDto update(UUID id, DocumentDto documentDto);

    DocumentDto get(UUID id);

    PagedDocs getByFilter(DocumentFilter filter, Pageable pageable);

    DocumentDto saveFile(UUID id, MultipartFile file);

    String getFilename(UUID id);

    DocumentDto save(DocumentDto documentDto);
}
