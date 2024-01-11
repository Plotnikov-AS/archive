package ru.mai.archive.config.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("minio")
public class MinioProperties {
    private String url;
    private String user;
    private String password;
    private String bucket;
}
