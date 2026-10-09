# Practice dashboard

Open `/progress` or select **My practice** from the language library or lesson page.

- View lessons marked practiced for each language and across the 40 test lessons.
- Resume the last opened lesson, including its exact lesson number.
- Open the next unpracticed lesson in the profile's target language, defaulting to French when no profile is saved.
- Review saved writing and revisit its lesson to continue editing.

Practice counts describe participation, not assessed language proficiency. Marking a lesson practiced still requires the lesson's recall activity and a written response. Saving a draft preserves any existing practiced status.

Drafts and completion records use the existing `learning-app-test-practice-v1` browser storage key. Earlier records remain usable without a timestamp; subsequent saves add a date. The last opened lesson uses `learning-app-last-lesson-v1`. Lesson links use the `lesson` query parameter, such as `/lessons/fr?lesson=fr-02`.

This prototype stores practice on the current browser only, without account synchronization. Storage failures show a message and allow session-only practice. Unsaved writing and voice recordings are not retained by the dashboard. Clearing a learning profile does not clear practice records.
