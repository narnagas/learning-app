# Personal learning profile: first implementation

Open `/profile` from the language library or lesson player. This optional flow uses written introductory prompts as the first step toward a native-language conversation. Prompt translations currently cover English, Spanish, French, Turkish, Russian, and Italian. Another-language users can answer in their own language with English prompts.

Users select their target language, everyday context, interests, goal, conversation depth, and starting assistance. They can describe their communication style and answer three prompts about their experiences and conversational preferences. All fields are optional; defaults allow practice without onboarding.

The saved profile is visible and editable. Context, interests, and depth shape supplementary writing guidance. Starting assistance controls initial transcript/grammar visibility, and changing assistance during a lesson updates the saved profile. Depth is separate from proficiency; no intelligence or personality classification is performed.

Conversation answers, communication preferences, and goals are preserved in the user's words. They are not automatically analyzed, translated, sent to a provider, or shared with tutors. Current personalization is deterministic and uses explicitly selected preferences. The existing forty fixture lessons remain unchanged.

## Storage and controls

Profiles use browser local storage under `learning-app-profile-v1`, separate from test-lesson drafts and completion data. Saving is explicit. Unsaved profile edits are discarded on navigation. Clear saved profile removes the profile while preserving lesson progress. This is per browser/origin, without accounts or cross-device synchronization.

If storage is unavailable, the profile can still be used during the current application session and the UI reports the limitation. Saved data is validated before use. Later backend work must define access controls, retention, sharing consent, and synchronization.

## Validation

Production compilation and the Docker build passed. Browser checks covered translated prompt switching, explicit save, refresh persistence, preference-based writing guidance, starting assistance, assistance updates during practice, and clearing the test profile. Live conversational onboarding and AI interpretation remain future work.
