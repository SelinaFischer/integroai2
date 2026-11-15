// GENERATED from src/data/time-audit.json by scripts/build-time-audit-gs.mjs.
// Do not edit by hand. Change the JSON file and run: npm run build:time-audit-gs
var TIME_AUDIT_DATA = {
  "bands": {
    "": {
      "label": "Select hours per week",
      "h": 0
    },
    "u1": {
      "label": "Under 1 hour",
      "h": 0.5
    },
    "h13": {
      "label": "1 to 3 hours",
      "h": 2
    },
    "h35": {
      "label": "3 to 5 hours",
      "h": 4
    },
    "h510": {
      "label": "5 to 10 hours",
      "h": 7.5
    },
    "h10": {
      "label": "Over 10 hours",
      "h": 12
    }
  },
  "weeks": 4.33,
  "effort": {
    "low": 1,
    "medium": 2,
    "high": 3
  },
  "risk": {
    "low": 1,
    "medium": 1.5,
    "high": 2.5
  },
  "areas": {
    "admin": {
      "name": "Managing everyday admin and repetitive tasks",
      "short": "Admin",
      "tasks": [
        {
          "t": "Sorting and replying to routine emails",
          "e": "low",
          "r": "medium",
          "fix": "Turn your most common emails into reusable reply templates.",
          "steps": [
            "Find five examples of emails you commonly receive, and remove personal details.",
            "Use the prompt to turn them into reply templates.",
            "Save each template in your email so it is ready to reuse."
          ],
          "prompt": "Here are five emails I often receive, with personal details removed: [paste your five emails]. For each one, write a reusable reply template. Put anything that changes each time in [square brackets]. Keep each under 120 words and end with one clear next step. Do not invent prices, policies, deadlines or commitments. Use placeholders for missing information."
        },
        {
          "t": "Booking and rescheduling meetings",
          "e": "low",
          "r": "low",
          "fix": "Share a booking link so clients can choose a time without back-and-forth emails.",
          "steps": [
            "Check whether your existing calendar or email service includes a booking page.",
            "Set your available hours and meeting length. Connect your calendar so existing appointments block out unavailable times.",
            "Copy your booking link into your email signature and the reply template below. Check that your booking tool's confirmation email lets clients cancel or reschedule. In some tools this is a setting you need to turn on."
          ],
          "template": "Hi [name],\n\nThanks for getting in touch. To save going back and forth, you can pick a time that suits you here: [booking link]\n\nIf none of those times work, just reply and we will find another.\n\n[Your name]\n[Business name]"
        },
        {
          "t": "Entering the same details in more than one place",
          "e": "medium",
          "r": "low",
          "fix": "Capture information once, in one place, so it does not need to be retyped.",
          "steps": [
            "Write down where the information starts and everywhere you retype it.",
            "Use the prompt to find the simplest way to enter it once, starting with tools you already use.",
            "Try the simplest option on one week of real entries before changing anything else."
          ],
          "prompt": "I copy this information manually: [what the information is]. It starts in [where the information starts] and I retype it into [where you retype it]. In plain English, explain the simplest ways to stop retyping it, starting with options inside tools I already use. Say clearly where you are not sure a feature exists."
        },
        {
          "t": "Writing up meeting notes and actions",
          "e": "low",
          "r": "low",
          "fix": "Use AI to turn rough notes into a clear summary of decisions and actions.",
          "steps": [
            "Take rough notes during the meeting.",
            "Paste them into the prompt.",
            "Check the actions, then share the summary."
          ],
          "prompt": "Turn these rough meeting notes into a three-line summary, the decisions made, and a list of actions with owner and date. Use only what is in the notes. Mark anything unclear with [check]. Notes: [paste your notes]."
        },
        {
          "t": "Finding saved files and documents",
          "e": "medium",
          "r": "low",
          "fix": "Set up a simple shared folder structure and one file naming rule.",
          "steps": [
            "List what you store, such as quotes, invoices and client files.",
            "Use the prompt to draft five to seven main folders and one file naming rule.",
            "Agree the structure with your team before moving any files."
          ],
          "prompt": "Design a simple shared folder structure for my business. We have [number of people] people and mainly store [what you store]. No more than seven main folders. Include one file naming rule and an example file name for each folder."
        },
        {
          "t": "Repeatedly explaining the same tasks to your team",
          "e": "medium",
          "r": "low",
          "fix": "Document the task once as a standard operating procedure (SOP), so others can follow it without asking you.",
          "steps": [
            "Choose one task people often ask you about.",
            "Note the steps, or record yourself talking them through, while you complete the task.",
            "Use the prompt to turn your notes into a checklist."
          ],
          "prompt": "Turn these rough notes on how we do [the task] into a step-by-step checklist someone new could follow. Number the steps, flag any step that needs a decision, and mark anything unclear with [check]. Notes: [paste your notes]."
        }
      ]
    },
    "marketing": {
      "name": "Creating marketing content and social posts",
      "short": "Marketing",
      "tasks": [
        {
          "t": "Planning and writing social media posts",
          "e": "low",
          "r": "medium",
          "fix": "Draft eight posts in one session instead of starting from scratch each time.",
          "steps": [
            "Choose three questions your customers often ask.",
            "Use the prompt to draft eight posts.",
            "Edit them to match your voice, then schedule them."
          ],
          "prompt": "Customers often ask: [three customer questions]. Write eight short social posts, one idea each: four tips, two stories I can fill in and two common mistakes. No more than three hashtags each. Do not make up statistics."
        },
        {
          "t": "Repurposing blogs, talks or videos for other channels",
          "e": "low",
          "r": "low",
          "fix": "Repurpose one existing piece into social posts, an email introduction and short quotes.",
          "steps": [
            "Pick one blog, long post, or the transcript of a talk or video.",
            "Paste it into the prompt.",
            "Edit the drafts, then schedule them."
          ],
          "prompt": "Here is something I created: [paste your content]. Turn it into three short social posts, each on a different point, one email introduction and five one-line quotes. Use only ideas from the original and keep my wording where you can. Do not add facts, examples or claims that are not in the original."
        },
        {
          "t": "Replying to reviews and comments",
          "e": "low",
          "r": "high",
          "fix": "Use AI to draft replies, then review and send each one yourself.",
          "steps": [
            "Paste the review or comment into the prompt.",
            "Read the draft and adjust anything personal.",
            "Send it yourself. Never let a reply go out unchecked."
          ],
          "prompt": "Draft a reply to this customer review: [paste the review]. Thank them, answer their point honestly, and offer one next step if they were unhappy. Under 80 words. Do not promise anything I have not confirmed."
        },
        {
          "t": "Writing your email newsletter",
          "e": "medium",
          "r": "medium",
          "fix": "Use a fixed structure so each issue is quicker to write.",
          "steps": [
            "Agree three regular sections, such as a tip, news and an offer.",
            "Collect notes between issues.",
            "Use the prompt to turn your notes into the issue."
          ],
          "prompt": "Write my email newsletter from these notes: [paste your notes]. Sections: [section 1], [section 2], [section 3]. Give three subject line options. Under 300 words. Do not add facts that are not in my notes."
        },
        {
          "t": "Reviewing the results of posts and campaigns",
          "e": "medium",
          "r": "low",
          "fix": "Review a few key figures each month and focus on what generates enquiries.",
          "steps": [
            "Export last month's post results.",
            "Paste them into the prompt.",
            "Focus on what performed best and reduce what performed worst."
          ],
          "prompt": "Here are last month's post results: [paste your results]. Tell me the two posts that did best and the two that did worst, and what each pair has in common. Five bullet points at most. Use only the numbers I gave you."
        }
      ]
    },
    "docs": {
      "name": "Writing emails, proposals and documents",
      "short": "Documents",
      "tasks": [
        {
          "t": "Drafting detailed replies to clients",
          "e": "low",
          "r": "medium",
          "fix": "Use AI to write the first draft, then review and refine it.",
          "steps": [
            "Find two or three emails you are happy with.",
            "Paste them into the prompt with the key points for the new email.",
            "Check the facts, then send."
          ],
          "prompt": "Here are emails I have written that sound like me: [paste two or three of your emails]. Now write an email to [who it is for] about [topic]. Key points: [your key points]. Match my tone and length. Do not add facts I have not given you."
        },
        {
          "t": "Preparing proposals and quotes",
          "e": "medium",
          "r": "medium",
          "fix": "Create a standard proposal structure and complete it from your call notes.",
          "steps": [
            "Take your best past proposal and remove the client details.",
            "Paste it into the prompt with your new call notes.",
            "Check every price and date yourself before sending."
          ],
          "prompt": "Here is the structure of a proposal I have used before, with client details removed: [paste your past proposal]. Here are my notes from a call with a new client: [paste your call notes]. Draft a proposal in the same structure. Leave every price and date as [to confirm]. List any questions I should answer before sending."
        },
        {
          "t": "Preparing reports and client documents",
          "e": "medium",
          "r": "medium",
          "fix": "Use standard headings and let AI draft the report from your notes.",
          "steps": [
            "Decide your standard headings.",
            "Paste your notes into the prompt.",
            "Review the draft and add your professional judgement."
          ],
          "prompt": "Turn these notes into a client report with these headings: [your headings]. Notes: [paste your notes]. Use only what is in my notes. Mark anything you are unsure about with [check]."
        },
        {
          "t": "Recreating standard letters and emails each time",
          "e": "low",
          "r": "low",
          "fix": "Save each recurring letter as a template with fields to complete.",
          "steps": [
            "List the letters you send more than once a month.",
            "Use the prompt to turn each one into a template.",
            "Save them where you write your emails."
          ],
          "prompt": "Turn this letter into a reusable template. Replace anything that changes each time with [square brackets]. Letter: [paste the letter]."
        },
        {
          "t": "Proofreading and formatting documents before sending",
          "e": "low",
          "r": "low",
          "fix": "Use AI to check your writing against your own house style.",
          "steps": [
            "Write three to five house rules, such as British spelling.",
            "Paste the rules and your text into the prompt.",
            "Accept only the changes you agree with."
          ],
          "prompt": "Proofread this text. My rules: [your rules]. Fix spelling, grammar and consistency only. Do not change my meaning. List your changes. Text: [paste your text]."
        }
      ]
    },
    "data": {
      "name": "Working with spreadsheets and business data",
      "short": "Spreadsheets",
      "tasks": [
        {
          "t": "Entering data into spreadsheets manually",
          "e": "medium",
          "r": "medium",
          "fix": "Collect information through a form linked to your spreadsheet.",
          "steps": [
            "List the columns you fill in manually.",
            "If the information comes from customers or colleagues, create a form with one question per column. Google Forms and Microsoft Forms can both save responses to a spreadsheet.",
            "If it comes from invoices, emails or another system, use the prompt to find the simplest alternative."
          ],
          "prompt": "I enter data into this spreadsheet manually. The columns are: [your column headings]. The data comes from: [where the data comes from]. The tools I currently use are: [tools you use].\n\nSuggest the simplest way to reduce manual data entry, starting with my existing tools. Explain the steps, highlight any assumptions and ask for any missing information you need."
        },
        {
          "t": "Compiling weekly or monthly reports",
          "e": "medium",
          "r": "medium",
          "fix": "Build the report once, then update it with new data each period.",
          "steps": [
            "Choose the five figures you review most often.",
            "Use the prompt to build a summary tab.",
            "Each month, add the new data and the summary will update."
          ],
          "prompt": "Every month I build a report from data with these columns: [your column headings]. The numbers I need are: [the figures you need]. Give me step-by-step instructions to build a summary tab in [Excel or Google Sheets] that updates when I paste in new data. Explain each formula in plain English."
        },
        {
          "t": "Correcting inconsistent data and removing duplicates",
          "e": "medium",
          "r": "medium",
          "fix": "Standardise your data and remove duplicates, then introduce checks to prevent recurring errors.",
          "steps": [
            "Copy a sample of the data, with personal details removed.",
            "Use the prompt to get correction steps.",
            "Add dropdown lists or a form to keep future entries consistent."
          ],
          "prompt": "Here is a sample of my messy data, with personal details removed: [paste a sample of your data]. Tell me what is inconsistent, then give step-by-step instructions to clean it in [Excel or Google Sheets]. Suggest one way to stop it happening again."
        },
        {
          "t": "Analysing data to answer business questions",
          "e": "low",
          "r": "medium",
          "fix": "Use an AI assistant to analyse your spreadsheet and explain the calculations behind its findings.",
          "steps": [
            "Remove personal and client details from the file.",
            "Upload it to your AI assistant with the prompt.",
            "Check the answer against the sheet."
          ],
          "prompt": "I have attached a spreadsheet of [what the spreadsheet contains]. My question: [your question]. Show how you worked out each number. If the data cannot answer the question, say so."
        },
        {
          "t": "Checking spreadsheets against each other for errors",
          "e": "medium",
          "r": "high",
          "fix": "Use a lookup formula to flag differences, then review each one.",
          "steps": [
            "Make sure both sheets share one column, such as an invoice number.",
            "Use the prompt to get the exact formula.",
            "Review every flagged row manually."
          ],
          "prompt": "I have two sheets. Sheet A has these columns: [Sheet A columns]. Sheet B has: [Sheet B columns]. Both share [the shared column]. Give me a formula for [Excel or Google Sheets] that flags rows that do not match, and explain it in plain English."
        }
      ]
    },
    "paid": {
      "name": "Sending and chasing invoices",
      "short": "Getting paid",
      "tasks": [
        {
          "t": "Creating and sending invoices",
          "e": "low",
          "r": "medium",
          "fix": "Save your invoice details and email as templates, and set up repeat invoices for regular clients.",
          "steps": [
            "Save your standard invoice layout and payment details once.",
            "If any clients pay the same amount regularly, check your accounting software for repeating invoices.",
            "Save the email below as a template and send it with each invoice."
          ],
          "template": "Hi [name],\n\nPlease find attached invoice [number] for [amount], due on [date].\n\nYou can pay by [payment details]. If you have any questions, just reply to this email.\n\nThank you,\n[Your name]\n[Business name]"
        },
        {
          "t": "Chasing late payments",
          "e": "low",
          "r": "medium",
          "fix": "Prepare a set of reminder emails and send them on a fixed schedule.",
          "steps": [
            "Check your accounting software for automatic reminders.",
            "If it has none, use the prompt to write a set of three.",
            "Decide at which point you will call the client instead."
          ],
          "prompt": "Write three payment reminder emails for an overdue invoice: a friendly one at 7 days late, a firmer one at 14 days and a final one at 30 days. Under 80 words each. Use [invoice number], [amount] and [due date] as placeholders. Polite, never threatening."
        },
        {
          "t": "Matching payments to invoices",
          "e": "medium",
          "r": "high",
          "fix": "Use your accounting software's bank feed to suggest matches, and approve each one yourself.",
          "steps": [
            "Check whether your accounting software has a bank feed.",
            "Set rules for regular payments.",
            "Approve every match yourself."
          ],
          "prompt": "Explain in plain English how bank feeds and matching rules usually work in accounting software such as [your software], and what I should check before approving a match. Say where features may differ."
        },
        {
          "t": "Collecting expense receipts",
          "e": "low",
          "r": "low",
          "fix": "Capture each receipt on the day, ideally with your accounting software's receipt app.",
          "steps": [
            "Check whether your accounting software has a receipt app, and set it up on your phone.",
            "If it has none, photograph each receipt into one shared folder the same day.",
            "Use the prompt to set up a five-minute monthly check."
          ],
          "prompt": "Suggest a simple routine for capturing receipts the day I get them, using [your accounting software or phone]. Include where to store them, how to name them, and a five-minute monthly check so nothing is missed."
        }
      ]
    },
    "leads": {
      "name": "Following up leads and enquiries",
      "short": "Leads",
      "tasks": [
        {
          "t": "Answering common questions from new enquiries",
          "e": "low",
          "r": "medium",
          "fix": "Prepare a standard first reply so every new enquiry receives a response the same day.",
          "steps": [
            "List the questions new enquiries usually ask.",
            "Save a first reply that answers them and offers a next step, such as a call.",
            "Use the prompt for any enquiry that does not fit."
          ],
          "prompt": "Here is a new enquiry, with personal details removed: [paste the enquiry]. Draft a short first reply that thanks them, answers what they asked and offers a next step: [your next step, e.g. a call or booking link]. Under 100 words. If you need information you don't have, list it instead of guessing."
        },
        {
          "t": "Following up quotes with no response",
          "e": "low",
          "r": "medium",
          "fix": "Set a follow-up schedule for every quote so none are forgotten.",
          "steps": [
            "List your open quotes and the date each was sent.",
            "Follow up at 3, 7 and 14 days.",
            "Use the prompt to write the three messages once."
          ],
          "prompt": "Write three short follow-up messages for a quote that has had no reply: one at 3 days, one at 7 days and one at 14 days. Helpful, never pushy. Under 70 words each. Use [client name], [what the quote was for] and [date sent] as placeholders."
        },
        {
          "t": "Returning missed calls from potential clients",
          "e": "medium",
          "r": "medium",
          "fix": "Make sure every missed call receives a response the same day.",
          "steps": [
            "Check whether your phone system can send a text after a missed call.",
            "Use the message below.",
            "Set a fixed time each day to return calls. If calls come in all day, an AI phone answering service can take them for you."
          ],
          "template": "Sorry we missed your call. We will call you back by [time]. If it is easier, book a time here: [booking link] or email [email address]. [Business name]"
        },
        {
          "t": "Asking satisfied clients for reviews",
          "e": "low",
          "r": "low",
          "fix": "Ask for a review when the client is most satisfied, using a direct link.",
          "steps": [
            "Decide the moment to ask, such as when a job is signed off.",
            "Get the direct link to your review page.",
            "Save the message below and reuse it every time. Never offer a reward for a review."
          ],
          "template": "Hi [name],\n\nThank you for choosing us for [what we did]. If you were happy with our work, would you mind leaving a short review? It only takes a minute: [review link]\n\nThank you,\n[Your name]\n[Business name]"
        }
      ]
    }
  },
  "getNeed": {
    "admin-0": [
      "Reply templates for your most common emails",
      "Five examples of emails you commonly receive"
    ],
    "admin-1": [
      "Your own booking link and a reusable reply",
      "Your available booking hours"
    ],
    "admin-2": [
      "A plan to enter information once",
      "A list of where you enter the same details"
    ],
    "admin-3": [
      "A clear summary with actions, owners and dates",
      "Your rough meeting notes"
    ],
    "admin-4": [
      "A folder structure and file naming rule",
      "A list of the documents you store"
    ],
    "admin-5": [
      "A step-by-step checklist others can follow",
      "Rough notes on how you complete one task"
    ],
    "marketing-0": [
      "Eight draft social media posts",
      "Three questions customers often ask"
    ],
    "marketing-1": [
      "Three social posts, an email introduction and five quotes",
      "One blog, long post, or the transcript of a talk or video"
    ],
    "marketing-2": [
      "A considered draft reply to review and send",
      "The review or comment"
    ],
    "marketing-3": [
      "A draft newsletter ready to edit",
      "Your notes since the last issue"
    ],
    "marketing-4": [
      "Your strongest and weakest posts, and what they have in common",
      "Last month's post results"
    ],
    "docs-0": [
      "A first draft in your own style",
      "Two or three emails you are happy with"
    ],
    "docs-1": [
      "A draft proposal in your usual structure",
      "A past proposal and your call notes"
    ],
    "docs-2": [
      "A draft report under your standard headings",
      "Your notes and standard headings"
    ],
    "docs-3": [
      "Reusable templates with fields to complete",
      "The letters you send most often"
    ],
    "docs-4": [
      "A checked version and a list of changes",
      "Your text and a few house style rules"
    ],
    "data-0": [
      "A form that saves responses directly to your spreadsheet, reducing manual data entry",
      "Your spreadsheet's column headings and a list of the information you need to collect"
    ],
    "data-1": [
      "A summary tab that updates when you add new data",
      "The five figures you check most often"
    ],
    "data-2": [
      "A clear process for correcting existing data and maintaining consistent entries",
      "A sample of the data, with personal details removed"
    ],
    "data-3": [
      "An answer supported by clear calculations and relevant data",
      "The spreadsheet, with personal details removed"
    ],
    "data-4": [
      "A formula that flags mismatched rows",
      "Two sheets that share one column"
    ],
    "paid-0": [
      "A ready-to-send invoice email",
      "Your invoice and payment details"
    ],
    "paid-1": [
      "Three reminder emails on a set schedule",
      "Your overdue invoice details"
    ],
    "paid-2": [
      "A clear explanation of bank matching",
      "The name of your accounting software"
    ],
    "paid-3": [
      "A simple routine for capturing receipts",
      "Your accounting software or phone"
    ],
    "leads-0": [
      "A standard first reply for new enquiries",
      "The questions new enquiries usually ask"
    ],
    "leads-1": [
      "Three follow-up messages for unanswered quotes",
      "A list of your open quotes"
    ],
    "leads-2": [
      "A ready-to-send text for missed calls",
      "Your booking link or email address"
    ],
    "leads-3": [
      "A ready-to-send review request",
      "Your review page link"
    ]
  },
  "watch": {
    "admin-0": "If you need to edit a template heavily each time, it is too general. Create fewer, more specific templates.",
    "admin-1": "Keep some time free for urgent calls, so the booking link does not delay priority work.",
    "admin-2": "Make sure the manual process is clear before connecting tools. Automating an unclear process only repeats the problem faster.",
    "admin-3": "Check names, dates and owners. AI summaries can omit or confuse actions.",
    "admin-4": "Agree the structure with your team before moving files. It only works if everyone uses it.",
    "admin-5": "Ask the person who does the task to review the checklist. People often skip steps they do out of habit.",
    "marketing-0": "If most drafts need heavy rewriting, share two of your own posts first so the AI can match your style.",
    "marketing-1": "Check that each draft makes sense on its own, without the original alongside it.",
    "marketing-2": "A generic reply can do more harm than no reply. Add at least one personal detail.",
    "marketing-3": "If you rewrite most of the draft, your notes need more detail. Include one real example in each issue.",
    "marketing-4": "Small numbers can be misleading. Look for patterns over several months before changing direction.",
    "docs-0": "Check every fact, date and commitment. AI can sound confident even when it is wrong.",
    "docs-1": "Never send a price, date or scope written by AI without checking it against your own notes.",
    "docs-2": "Your professional judgement is what clients pay for. Use AI for structure, not conclusions.",
    "docs-3": "Review your templates regularly, so outdated prices or details are not sent.",
    "docs-4": "AI can change your meaning while correcting grammar. Review the list of changes, not just the final text.",
    "data-0": "Test a few sample responses to confirm that each answer appears in the correct column.",
    "data-1": "Compare the summary with one month you calculated manually before relying on it.",
    "data-2": "Keep a copy of the original data before making changes, in case anything is removed by mistake.",
    "data-3": "Verify key figures and calculations against the original spreadsheet before using the findings.",
    "data-4": "A formula only flags differences. You still need to decide which version is correct.",
    "paid-0": "Check the invoice number, amount and due date every time. These are the details clients notice.",
    "paid-1": "Automatic reminders can upset good clients. Pause them for anyone on agreed alternative terms.",
    "paid-2": "Incorrect matches can hide real problems. Review matches individually rather than approving them in bulk.",
    "paid-3": "An app only helps if it is used on the day. If receipts still build up, the routine needs attention, not the tool.",
    "leads-0": "A fast reply that misses the question can lose the enquiry. Make sure it answers what was asked.",
    "leads-1": "Stop after three follow-ups. Further messages can damage the relationship.",
    "leads-2": "Only promise a call-back time you can keep.",
    "leads-3": "Never write or edit reviews for clients, and never offer incentives for them."
  }
};
