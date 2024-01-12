package ru.mai.archive.repo.spec;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import ru.mai.archive.domain.Document;
import ru.mai.archive.generated.dto.DocumentFilter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class DocFilterSpec implements Specification<Document> {
    private final DocumentFilter filter;

    @Override
    public Predicate toPredicate(Root<Document> root,
                                 CriteriaQuery<?> query,
                                 CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(namePredicate(root, criteriaBuilder));
        predicates.add(authorPredicate(root, criteriaBuilder));
        predicates.add(extPredicate(root));
        predicates.add(numberPredicate(root));
        predicates = predicates.stream()
                .filter(Objects::nonNull)
                .toList();

        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }

    private Predicate numberPredicate(Root<Document> root) {
        if (CollectionUtils.isEmpty(filter.getNumber())) {
            return null;
        }
        return root.get("number").in(filter.getNumber());
    }

    private Predicate extPredicate(Root<Document> root) {
        if (CollectionUtils.isEmpty(filter.getExt())) {
            return null;
        }
        return root.get("ext").in(filter.getExt());
    }

    private Predicate authorPredicate(Root<Document> root, CriteriaBuilder criteriaBuilder) {
        if (CollectionUtils.isEmpty(filter.getAuthor())) {
            return null;
        }
        return criteriaBuilder.or(filter.getAuthor().stream()
                .map(author -> criteriaBuilder.isTrue(criteriaBuilder.function("word_similarity_commutator_op", Boolean.class,
                        root.get("author"),
                        criteriaBuilder.literal(author))))
                .toList()
                .toArray(new Predicate[0]));
    }

    private Predicate namePredicate(Root<Document> root, CriteriaBuilder criteriaBuilder) {
        if (StringUtils.isBlank(filter.getName())) {
            return null;
        }
        return criteriaBuilder.isTrue(criteriaBuilder.function("word_similarity_commutator_op", Boolean.class,
                root.get("name"),
                criteriaBuilder.literal(filter.getName())));
    }


}
