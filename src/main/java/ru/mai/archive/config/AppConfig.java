package ru.mai.archive.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.mai.archive.config.prop.MinioProperties;

@Configuration
@EnableConfigurationProperties(MinioProperties.class)
public class AppConfig {

    @Bean
    public MinioClient minioClient(MinioProperties minioProperties) throws Exception {
        MinioClient minio = MinioClient.builder()
                .endpoint(minioProperties.getUrl())
                .credentials(minioProperties.getUser(), minioProperties.getPassword())
                .build();
        boolean bucketExists = minio.bucketExists(BucketExistsArgs.builder().bucket(minioProperties.getBucket()).build());
        if (!bucketExists) {
            minio.makeBucket(MakeBucketArgs.builder()
                    .bucket(minioProperties.getBucket())
                    .build());
        }
        return minio;
    }

    @Bean
    public ModelMapper mapper() {
        return new ModelMapper();
    }
}
