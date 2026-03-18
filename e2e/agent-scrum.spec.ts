import { test, expect } from '@playwright/test';

test.describe('Agent Scrum Platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header & Navigation', () => {
    test('renders the TensorOps header with logo and nav links', async ({ page }) => {
      await expect(page.locator('text=TENSOROPS')).toBeVisible();
      await expect(page.locator('text=SERVICES')).toBeVisible();
      await expect(page.locator('text=CASE STUDIES')).toBeVisible();
      await expect(page.locator('text=CAREERS')).toBeVisible();
      await expect(page.locator('text=BLOG')).toBeVisible();
    });

    test('shows connected users count', async ({ page }) => {
      await expect(page.locator('text=other users connected')).toBeVisible();
    });

    test('shows session ID', async ({ page }) => {
      await expect(page.locator('text=Your session:')).toBeVisible();
    });

    test('shows Submit PRD button', async ({ page }) => {
      await expect(page.locator('text=Submit PRD')).toBeVisible();
    });
  });

  test.describe('Board Tabs', () => {
    test('shows Agent Scrum title and Software Development tab', async ({ page }) => {
      await expect(page.locator('text=Agent Scrum')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Software Development' })).toBeVisible();
    });

    test('shows epic filter dropdown', async ({ page }) => {
      const select = page.locator('select');
      await expect(select).toBeVisible();
      await expect(select).toHaveValue('All Epics');
    });

    test('shows + New Board button', async ({ page }) => {
      await expect(page.locator('text=+ New Board')).toBeVisible();
    });
  });

  test.describe('Kanban Board Columns', () => {
    test('renders all 7 swim lane columns', async ({ page }) => {
      const columnHeaders = page.locator('h3');
      await expect(columnHeaders.filter({ hasText: 'Backlog' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'Ready for Breakdown' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'In Breakdown' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'Tasks in Review' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'In Development' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'In QA' })).toBeVisible();
      await expect(columnHeaders.filter({ hasText: 'Done' })).toBeVisible();
    });

    test('columns display task count badges', async ({ page }) => {
      // Each column header area has a count badge - check that count badges exist
      const columnHeaders = page.locator('h3').filter({ hasText: /^(Backlog|Done|In QA|In Development)$/ });
      expect(await columnHeaders.count()).toBeGreaterThanOrEqual(4);
    });

    test('In Development column has tasks', async ({ page }) => {
      // Check there are task cards visible in the board
      const taskCards = page.locator('text=As a user, I want');
      expect(await taskCards.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Task Cards', () => {
    test('task cards display title and description', async ({ page }) => {
      const cards = page.locator('text=[From PRD]');
      expect(await cards.count()).toBeGreaterThan(0);
    });

    test('task cards show subtask progress bars', async ({ page }) => {
      // Look for progress indicators (e.g. "2/4", "4/4")
      const progressIndicators = page.locator('text=/\\d+\\/\\d+/');
      expect(await progressIndicators.count()).toBeGreaterThan(0);
    });

    test('clicking a task card opens detail modal', async ({ page }) => {
      // Click the first task card
      const firstCard = page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').first();
      await firstCard.click();

      // Modal should appear with Description header
      await expect(page.locator('text=Description')).toBeVisible();
      await expect(page.locator('text=Column')).toBeVisible();
    });

    test('task detail modal shows subtask checkboxes', async ({ page }) => {
      // Click a task card that has subtask progress indicator (has subtasks)
      const cardWithSubtasks = page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer')
        .filter({ has: page.locator('text=/\\d+\\/\\d+/') }).first();
      await cardWithSubtasks.click();

      // Should show subtasks section
      await expect(page.locator('text=Subtasks')).toBeVisible();
    });

    test('task detail modal can be closed', async ({ page }) => {
      const firstCard = page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').first();
      await firstCard.click();

      await expect(page.locator('text=Description')).toBeVisible();

      // Click close button (X)
      const closeButton = page.locator('.fixed button').first();
      await closeButton.click();

      // Modal should disappear
      await expect(page.locator('.fixed.inset-0')).toHaveCount(0);
    });
  });

  test.describe('Agent Sidebar', () => {
    test('shows Agents section header', async ({ page }) => {
      await expect(page.locator('aside').locator('text=Agents')).toBeVisible();
    });

    test('displays all 6 agents with roles', async ({ page }) => {
      const sidebar = page.locator('aside');
      // Use the agent grid section (first child section of sidebar) to find agent names
      const agentSection = sidebar.locator('.grid');
      await expect(agentSection.locator('text=Product Owner')).toBeVisible();
      await expect(agentSection.locator('text=Tech Lead')).toBeVisible();
      await expect(agentSection.locator('text=QA')).toBeVisible();
      await expect(agentSection.locator('text=Developer')).toBeVisible();
      await expect(agentSection.locator('text=Code Reviewer')).toBeVisible();
      await expect(agentSection.locator('text=Scrum Master')).toBeVisible();
    });

    test('agents show status indicators (idle/working)', async ({ page }) => {
      const sidebar = page.locator('aside');
      // QA agent is set to 'working' by default
      await expect(sidebar.locator('text=Working')).toBeVisible();
      // Other agents should show Idle
      const idleCount = await sidebar.locator('text=Idle').count();
      expect(idleCount).toBeGreaterThan(0);
    });

    test('shows Agent Chat section with messages', async ({ page }) => {
      await expect(page.locator('text=Agent Chat')).toBeVisible();
      await expect(page.locator('text=messages')).toBeVisible();
    });

    test('chat messages display sender and recipient', async ({ page }) => {
      // Check for arrow indicators between agents
      const chatMessages = page.locator('aside').locator('text=@');
      expect(await chatMessages.count()).toBeGreaterThan(0);
    });

    test('chat messages show story and task reference badges', async ({ page }) => {
      await expect(page.locator('text=STORY-').first()).toBeVisible();
      await expect(page.locator('text=TASK-').first()).toBeVisible();
    });

    test('shows Simulate button', async ({ page }) => {
      await expect(page.locator('button', { hasText: 'Simulate' })).toBeVisible();
    });

    test('has chat input field', async ({ page }) => {
      await expect(page.locator('input[placeholder*="Type a message"]')).toBeVisible();
    });
  });

  test.describe('Submit PRD Modal', () => {
    test('opens when clicking Submit PRD button', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      await expect(page.locator('text=Submit Product Requirements Document')).toBeVisible();
    });

    test('has textarea for PRD input', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      await expect(page.locator('textarea')).toBeVisible();
    });

    test('submit button is disabled when textarea is empty', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      const submitBtn = page.locator('.fixed button', { hasText: 'Submit PRD' });
      await expect(submitBtn).toBeDisabled();
    });

    test('submit button enables after entering text', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      await page.locator('textarea').fill('# My PRD\nThis is a test PRD');
      const submitBtn = page.locator('.fixed button', { hasText: 'Submit PRD' });
      await expect(submitBtn).toBeEnabled();
    });

    test('shows success message after submission', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      await page.locator('textarea').fill('# My PRD\nTest requirements');
      await page.locator('.fixed button', { hasText: 'Submit PRD' }).click();
      await expect(page.locator('text=PRD Submitted Successfully')).toBeVisible();
    });

    test('closes when clicking Cancel', async ({ page }) => {
      await page.locator('button', { hasText: 'Submit PRD' }).click();
      await expect(page.locator('text=Submit Product Requirements Document')).toBeVisible();
      await page.locator('button', { hasText: 'Cancel' }).click();
      await expect(page.locator('text=Submit Product Requirements Document')).toHaveCount(0);
    });
  });

  test.describe('New Board Modal', () => {
    test('opens when clicking + New Board', async ({ page }) => {
      await page.locator('text=+ New Board').click();
      await expect(page.locator('text=Create New Board')).toBeVisible();
    });

    test('shows 4 board templates', async ({ page }) => {
      await page.locator('text=+ New Board').click();
      const modal = page.locator('.fixed');
      await expect(modal.locator('h4', { hasText: 'Software Development' })).toBeVisible();
      await expect(modal.locator('h4', { hasText: 'Talent Acquisition' })).toBeVisible();
      await expect(modal.locator('h4', { hasText: 'Sales' })).toBeVisible();
      await expect(modal.locator('h4', { hasText: 'CISO' })).toBeVisible();
    });

    test('creates a new board tab on submit', async ({ page }) => {
      await page.locator('text=+ New Board').click();
      await page.locator('.fixed').locator('text=Talent Acquisition').click();
      await page.locator('.fixed input').fill('Hiring Pipeline');
      await page.locator('button', { hasText: 'Create Board' }).click();

      // New tab should appear
      await expect(page.getByRole('button', { name: 'Hiring Pipeline' })).toBeVisible();
    });
  });

  test.describe('Settings Modal', () => {
    test('opens when clicking settings gear icon', async ({ page }) => {
      await page.locator('button[title="Settings"]').click();
      await expect(page.locator('text=Settings').first()).toBeVisible();
    });

    test('has General, Agents, and Tools tabs', async ({ page }) => {
      await page.locator('button[title="Settings"]').click();
      await expect(page.locator('.fixed button', { hasText: 'general' })).toBeVisible();
      await expect(page.locator('.fixed button', { hasText: 'agents' })).toBeVisible();
      await expect(page.locator('.fixed button', { hasText: 'tools' })).toBeVisible();
    });

    test('General tab shows model selectors', async ({ page }) => {
      await page.locator('button[title="Settings"]').click();
      await expect(page.locator('text=Speed Model')).toBeVisible();
      await expect(page.locator('text=Reasoning Model')).toBeVisible();
    });

    test('Tools tab shows 31 built-in tools', async ({ page }) => {
      await page.locator('button[title="Settings"]').click();
      await page.locator('.fixed button', { hasText: 'tools' }).click();
      await expect(page.locator('text=31 built-in tools')).toBeVisible();
      await expect(page.locator('text=Code Generator')).toBeVisible();
      await expect(page.locator('text=Security Scanner')).toBeVisible();
    });

    test('Agents tab lists all agent roles', async ({ page }) => {
      await page.locator('button[title="Settings"]').click();
      await page.locator('.fixed button', { hasText: 'agents' }).click();
      await expect(page.locator('.fixed').locator('text=Product Owner')).toBeVisible();
      await expect(page.locator('.fixed').locator('text=Scrum Master')).toBeVisible();
    });
  });

  test.describe('Epic Filter', () => {
    test('filtering by epic reduces visible tasks', async ({ page }) => {
      const allTasksBefore = await page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').count();

      await page.locator('select').selectOption('Authentication');

      const allTasksAfter = await page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').count();
      expect(allTasksAfter).toBeLessThan(allTasksBefore);
    });

    test('selecting All Epics shows all tasks again', async ({ page }) => {
      await page.locator('select').selectOption('Authentication');
      const filteredCount = await page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').count();

      await page.locator('select').selectOption('All Epics');
      const allCount = await page.locator('.bg-gray-800.rounded-lg.p-3.cursor-pointer').count();

      expect(allCount).toBeGreaterThan(filteredCount);
    });
  });

  test.describe('Agent Simulation', () => {
    test('clicking Simulate starts agent activity', async ({ page }) => {
      const initialMessageCount = await page.locator('aside').locator('text=→').count();

      await page.locator('button', { hasText: 'Simulate' }).click();

      // Wait for simulation to produce a message
      await page.waitForTimeout(4000);

      const newMessageCount = await page.locator('aside').locator('text=→').count();
      expect(newMessageCount).toBeGreaterThan(initialMessageCount);
    });

    test('Simulate button changes to Stop when active', async ({ page }) => {
      await page.locator('button', { hasText: 'Simulate' }).click();
      await expect(page.locator('button', { hasText: 'Stop' })).toBeVisible();
    });
  });
});
