package ru.mai.archive.service.impl;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import ru.mai.archive.config.prop.MinioProperties;
import ru.mai.archive.domain.Document;
import ru.mai.archive.generated.dto.DocumentDto;
import ru.mai.archive.generated.dto.DocumentFilter;
import ru.mai.archive.generated.dto.PagedDocs;
import ru.mai.archive.repo.DocumentsRepo;
import ru.mai.archive.service.DocumentsService;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentsServiceImpl implements DocumentsService {
    private final DocumentsRepo repo;
    private final MinioClient minio;
    private final MinioProperties minioProperties;
    private final ModelMapper mapper;

    @Override
    public void delete(UUID id) {
        repo.deleteById(id);
    }

    @Override
    public StreamingResponseBody download(UUID id) {
        try (InputStream is = minio.getObject(GetObjectArgs.builder()
                .bucket(minioProperties.getBucket())
                .object(id.toString())
                .build())) {
            return os -> IOUtils.copy(is, os);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public DocumentDto update(UUID id, DocumentDto documentDto) {
        boolean exists = repo.existsById(id);
        if (!exists) {
            throw new IllegalArgumentException("Документа с ID %s не существует".formatted(id));
        }
        Document doc = mapper.map(documentDto, Document.class)
                .setId(id);
        repo.save(doc);

        return mapper.map(doc, DocumentDto.class);
    }

    @Override
    public DocumentDto get(UUID id) {
        return mapper.map(getDoc(id), DocumentDto.class);
    }

    @Override
    public PagedDocs getByFilter(DocumentFilter filter, Pageable pageable) {
        return null;
    }

    @Override
    public DocumentDto saveFile(UUID id, MultipartFile file) {
        Document doc = getDoc(id);
        try {
            minio.putObject(PutObjectArgs.builder()
                    .bucket(minioProperties.getBucket())
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .object(id.toString())
                    .build());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
        doc.setFilename(FilenameUtils.getBaseName(file.getOriginalFilename()))
                .setExt(FilenameUtils.getExtension(file.getOriginalFilename()));
        repo.save(doc);

        return mapper.map(doc, DocumentDto.class);
    }

    @Override
    public String getFilename(UUID id) {
        Document doc = getDoc(id);

        return doc.getFilename() + "." + doc.getExt();
    }

    @Override
    public DocumentDto save(DocumentDto documentDto) {
        Document saved = repo.save(mapper.map(documentDto, Document.class));
        return mapper.map(saved, DocumentDto.class);
    }

    private Document getDoc(UUID id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Не найден документ %s".formatted(id)));
    }
}
