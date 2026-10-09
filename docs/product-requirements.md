# Learning App: product direction

Repository: https://github.com/narnagas/learning-app

## Purpose

Help adults understand, think, write, and eventually speak in a new language, preserving their mature ideas and individual voice. The application is a learning environment, not a universal translator.

Initial languages: French, Turkish, and Russian. English is also a discussed learning use case; confirm its release scope before implementation.

## Personalized learning

- Offer an optional introductory conversation in the learner's native language to explore their interests, everyday environment, goals, and conversational habits.
- Build an evolving communication profile covering preferred depth, pace, reading, storytelling, humor, empathy, and expression. Confirm interpretations with the user rather than treating them as facts.
- Do not infer or rank intelligence. Keep conversational sophistication separate from target-language proficiency.
- Make the profile visible, editable, and removable. Let users control recording retention and what information tutors receive.
- Ground lessons in meaningful adult situations from the learner's life. Simple language can express mature ideas; avoid infantilizing content.
- Offer adjustable everyday, exploratory, and in-depth conversation modes. Preferences can vary by topic.

## Learning sequence and assistance

1. Hear a contextual conversation.
2. Read and connect expressions to meaning.
3. Study grammar useful for expressing the learner's own ideas.
4. Write with adjustable vocabulary and grammar support.
5. Revise with explanations that preserve intended meaning.
6. Speak when ready, progressing toward spontaneous interaction.

Use the familiar language as an initial bridge and gradually increase target-language explanations. Assistance fades with progress but remains user-adjustable: vocabulary hints, sentence prompts, translation, and correction timing. Recommend changes without forcing them.

Assess comprehension, writing, grammar, independence from assistance, and later spoken interaction. Include contextual review and practical communication goals.

## Conversations, messages, and tutors

- Registered users can record and send voice messages for review or conversation.
- Provide an audio conversion layer, preview before sending, recipient selection, and message notifications.
- Support live audio/video conversations and relevant partner or tutor matching.
- Obtain participant consent for conversation recording and provide retention/deletion controls and blocking/reporting.
- Tutor candidates undergo live verification of conversational language ability and teaching ability. Verification concerns tutor suitability, not identity verification.
- Define reviewer roles, assessment criteria, feedback, approval scope by language/learner level, and reassessment before implementing tutor approval.
- Messaging, accounts, notifications, and shared recordings require backend services and storage; the original database-free concept applies to the initial local lesson player.

## Platforms and audio

- Shared Angular application, initially desktop, with iOS and Android support for phones and tablets.
- Platform folders: apps/learning-app/ios and apps/learning-app/android. Native projects are not yet generated; packaging framework remains undecided.
- GitHub repository under narnagas; planned Docker packaging and IIS deployment on the user's Dell.
- Initial source audio is WAV extracted from language CDs. Support streaming and offline lesson downloads.
- Design the audio layer for a future proprietary encrypted application format. A custom container and a new codec are separate decisions; neither is implemented yet.
- Define encryption, decryption-key access, and offline behavior before implementing the proprietary format. Keep this compatible with the recording/conversion workflow.

## Suggested delivery order (not a fixed commitment)

Prove one contextual lesson with listening, reading, grammar, writing, and adjustable assistance. Then add accounts and voice feedback, followed by live conversations and tutor verification. Treat proprietary audio development as a later milestone.
