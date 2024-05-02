--   {
--     "Name": "Number of repositories that depend on a library",
--     "Description": "Number of repositories that leverage an existing library and build upon it.",
--     "Importance": "Medium",
--     "Rationale": "Dependencies of a library point to the use of pre-existing tools to develop new projects. An increase impact to the Optimism Ecosystem can be showcased by ensuring the projects that depend on this library belong to the Optimism Ecosystem.",
--     "Keyword": "Libraries",
--     "Term": "Developer Tooling",
--     "Category": "Developer Ecosystem"
--   },
--   {
--     "Name": "Attestations received by the RetroPGF applicant",
--     "Description": "Can measure the perceived positive impact badgeholders have derived from an interaction. ",
--     "Importance": "High",
--     "Rationale": "Badgeholders require information to make informed decisions during the RetroPGF process. Additional information provided through attestations improves their ability to access information. ",
--     "Keyword": "Accessibility of data",
--     "Term": "Accountability",
--     "Category": "Collective Governance"
--   },
--   {
--     "Name": "Number of developers from other ecosystems that built on an OP Chain",
--     "Description": "Developers from other ecosystems who have built within the Optimism Ecosystem as a result of interoperable tooling",
--     "Importance": "High",
--     "Rationale": "Interoperable tooling enables developers from other blockchain ecosystems to easily deploy their projects in the OP Chains.",
--     "Keyword": "Interoperability",
--     "Term": "Developer Tooling",
--     "Category": "Developer Ecosystem"
--   },

-- Insert into keywords table
INSERT INTO keywords (name) VALUES
('Libraries'),
('Accessibility of data'),
('Interoperability');

-- Insert into terms table
INSERT INTO terms (name) VALUES
('Developer Tooling'),
('Accountability');

-- Insert into categories table
INSERT INTO categories (name) VALUES
('Developer Ecosystem'),
('Collective Governance');

-- Insert into impact_metrics table
INSERT INTO impact_metrics (name, description, importance, rationale) VALUES
('Number of repositories that depend on a library', 'Number of repositories that leverage an existing library and build upon it.', 'Medium', 'Dependencies of a library point to the use of pre-existing tools to develop new projects. An increase impact to the Optimism Ecosystem can be showcased by ensuring the projects that depend on this library belong to the Optimism Ecosystem.'),
('Attestations received by the RetroPGF applicant', 'Can measure the perceived positive impact badgeholders have derived from an interaction. ', 'High', 'Badgeholders require information to make informed decisions during the RetroPGF process. Additional information provided through attestations improves their ability to access information. '),
('Number of developers from other ecosystems that built on an OP Chain', 'Developers from other ecosystems who have built within the Optimism Ecosystem as a result of interoperable tooling', 'High', 'Interoperable tooling enables developers from other blockchain ecosystems to easily deploy their projects in the OP Chains.');

-- Insert into impact_metrics_keywords table
INSERT INTO impact_metrics_keywords (impact_metric_id, keyword_id) VALUES
((SELECT id FROM impact_metrics WHERE name = 'Number of repositories that depend on a library'), (SELECT id FROM keywords WHERE name = 'Libraries')),
((SELECT id FROM impact_metrics WHERE name = 'Attestations received by the RetroPGF applicant'), (SELECT id FROM keywords WHERE name = 'Accessibility of data')),
((SELECT id FROM impact_metrics WHERE name = 'Number of developers from other ecosystems that built on an OP Chain'), (SELECT id FROM keywords WHERE name = 'Interoperability'));

-- Insert into impact_metrics_terms table
INSERT INTO impact_metrics_terms (impact_metric_id, term_id) VALUES
((SELECT id FROM impact_metrics WHERE name = 'Number of repositories that depend on a library'), (SELECT id FROM terms WHERE name = 'Developer Tooling')),
((SELECT id FROM impact_metrics WHERE name = 'Attestations received by the RetroPGF applicant'), (SELECT id FROM terms WHERE name = 'Accountability')),
((SELECT id FROM impact_metrics WHERE name = 'Number of developers from other ecosystems that built on an OP Chain'), (SELECT id FROM terms WHERE name = 'Developer Tooling'));

-- Insert into impact_metrics_categories table
INSERT INTO impact_metrics_categories (impact_metric_id, category_id) VALUES
((SELECT id FROM impact_metrics WHERE name = 'Number of repositories that depend on a library'), (SELECT id FROM categories WHERE name = 'Developer Ecosystem')),
((SELECT id FROM impact_metrics WHERE name = 'Attestations received by the RetroPGF applicant'), (SELECT id FROM categories WHERE name = 'Collective Governance')),
((SELECT id FROM impact_metrics WHERE name = 'Number of developers from other ecosystems that built on an OP Chain'), (SELECT id FROM categories WHERE name = 'Developer Ecosystem'));

