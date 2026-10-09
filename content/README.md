# Lesson content

`manifests/fr/`, `manifests/tr/`, `manifests/ru/`, and `manifests/it/` hold French, Turkish, Russian, and Italian lesson definitions. `schemas/` will define and validate their structure.

Manifest design should include lesson version, contextual learning goals, relative audio references, transcripts, useful grammar, writing prompts, practice points, and assistance levels. The schema is not yet defined.

Store the source WAV collection and user recordings outside Git and outside public application assets. Configure their storage location when implementing audio hosting. Do not commit encryption keys or private media. English release scope remains to be confirmed.
