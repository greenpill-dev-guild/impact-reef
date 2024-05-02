create table categories
(
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    description text
);

create table keywords
(
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    description text
);

create table terms
(
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    description text
);

create table impact_metrics
(
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    description text,
    importance  text not null,
    rationale   text not null
);

create table impact_metrics_categories
(
    impact_metric_id uuid references impact_metrics (id),
    category_id      uuid references categories (id),
    primary key (impact_metric_id, category_id)
);

create table impact_metrics_keywords
(
    impact_metric_id uuid references impact_metrics (id),
    keyword_id       uuid references keywords (id),
    primary key (impact_metric_id, keyword_id)
);

create table impact_metrics_terms
(
    impact_metric_id uuid references impact_metrics (id),
    term_id          uuid references terms (id),
    primary key (impact_metric_id, term_id)
);



