package ru.mai.archive.api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.mai.archive.generated.api.DocumentsApi;
import ru.mai.archive.generated.dto.DocumentDto;
import ru.mai.archive.generated.dto.DocumentFilter;
import ru.mai.archive.generated.dto.PagedDocs;
import ru.mai.archive.service.DocumentsService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class DocumentsController implements DocumentsApi {
    private final DocumentsService documentsService;

    @Override
    public ResponseEntity<Void> delete(UUID id) {
        documentsService.delete(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Object> download(UUID id) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + documentsService.getFilename(id) + "\"")
                .body(documentsService.download(id));
    }

    @Override
    public ResponseEntity<DocumentDto> edit(UUID id, DocumentDto documentDto) {
        return ResponseEntity.ok(documentsService.update(id, documentDto));
    }

    @Override
    public ResponseEntity<DocumentDto> get(UUID id) {
        return ResponseEntity.ok(documentsService.get(id));
    }

    @Override
    public ResponseEntity<PagedDocs> getByFilter(DocumentFilter filter, Pageable pageable) {
        return ResponseEntity.ok(documentsService.getByFilter(filter, pageable));
    }

    @Override
    public ResponseEntity<DocumentDto> save(DocumentDto documentDto) {
        return ResponseEntity.ok(documentsService.save(documentDto));
    }

    @Override
    public ResponseEntity<DocumentDto> saveFile(UUID id, MultipartFile doc) {
        return ResponseEntity.ok(documentsService.saveFile(id, doc));
    }
}
