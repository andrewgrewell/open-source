# Product Development Lifecycle
The product development lifecycle is a process for developing a product.
It's important all members of the team understand the process and their role in it.
The aim is to be Agile, and while the process often follows Scrum, it is not dogmatic. 
The goal is to simplify and focus on the key roles and boundaries.

## High Level flow
- Work is identified that needs to be complete to further the organization's goals
- High level requirements are recorded, either in project management software (Jira, Shortcut, etc) or in a document (Notion, Google Docs, etc)
- High level requirements are reviewed and one iteration worth of work is identified
- Development tickets are created for developers to work on
- Iterate on the process until the work is deemed complete

## Completion
It's important the team is aligned on what the definition of done is for any single piece of work.
Complete is often (incorrectly) used to mean "to the greatest extent or degree; total". The reality is a team will rarely
have the time to complete work to the greatest extent possible, and instead it will be an iterative process of improving the product as a whole over time.

## Estimation
Estimation is a very tricky topic. For the purposes of this document, we will have the following assumptions:
- There is little reliable historical data to base estimates on
- The team is small and does not have the time to dive deep into uncovering every single unknown around a feature
- The tendency is to underestimate, because people are worried about looking bad, but underestimation leads to missed deadlines and burnout.
- We promote a healthy work/life balance, and it's important to avoid burnout.

With this in mind, the focus when establishing deadlines should be when the work is needed by, not how long will it take.
For example, we may want a fully functional video chat feature, and we need it in two weeks for a big demo. This naturally
creates constraints and helps to establish what is important for an MVP, and as is the case often with time management, it promotes working
backwards from the deadline.

Over time the team will get better at estimating, will have historical data, and will be able to accurately estimate delivery dates further in the future, but until that has been shown,
it's much more important to focus on near term deliverables and work iteratively.

## Roles
### Product Owner(s)
The Product Owner is responsible for determining the "what" and "why" of any feature work. 
The Product Owner will be responsible for establishing the high level priorities of what will be worked on.
For any work the Product Owner wishes the development team to complete, they should create an artifact detailing the "what" and "why".


### Technical Lead(s)
The Technical Lead is responsible for determining/facilitating the "how" and "when" of any feature work. 
The Technical Lead should take the Product Owner's high level requirements and break it into smaller chunks of work.
When breaking up work, the Technical Lead should consider the following:
- Dependencies between work items
- The smallest possible unit of work that can be completed and delivered (it may not work, but it logically makes sense in the code)
- Parallel work and reducing conflicts between branches

### Developer(s)
The Developer is responsible for implementing the actual work. A developer has control over the process for how they deliver work.
Meaning, if they do not agree with how the work has been broken up, they should discuss with the Technical Lead how they see the work
being completed, while still meeting the requirement of being small and reducing conflicts.
