# Notion Setup Guide (完整設置指南)

This guide will walk you through setting up Notion databases to power your link-in-bio site. The site pulls content from three Notion databases: Courses, Resources, and Deals.

## Step 1: Create a Notion Integration

1. Go to [Notion Developer Settings](https://www.notion.so/my-integrations)
2. Click "New Integration"
3. Name your integration (e.g., "Link in Bio")
4. Select your workspace
5. Copy the "Internal Integration Token" - this is your `NOTION_API_KEY`

## Step 2: Create the Courses Database

### 2.1 Create a new database in Notion

1. In your Notion workspace, click "+ Add a page"
2. Select "Database"
3. Choose "Table"
4. Name it "Courses"
5. Share this database with your integration:
   - Click "Share" button
   - Search for your integration name
   - Give it "Editor" permissions

### 2.2 Set up database properties

Delete the default "Title" column and create these properties:

| Property Name | Type | Description |
|---------------|------|-------------|
| Name | Title | Course name (e.g., "零基礎班") |
| Day | Text | Day of week (e.g., "週二") |
| Level | Text | Course level (e.g., "零基礎", "三級") |
| Time | Text | Class time (e.g., "20:00-21:30") |
| Available Spots | Number | Number of available spots |
| Description | Text | Course description |
| Registration Link | URL | Registration form link |
| Order | Number | Display order (ascending) |
| Published | Checkbox | Show/hide this course |

### 2.3 Add sample data

Create a few test entries:

| Name | Day | Level | Time | Available Spots | Description | Registration Link | Order | Published |
|------|-----|-------|------|-----------------|-------------|-------------------|-------|-----------|
| 零基礎班 | 週二 | 零基礎 | 20:00-21:30 | 1 | 目前進度及報名請私訊老師詢問 | | 1 | ✓ |
| 零基礎班 | 週三 | 零基礎 | 21:00-22:30 | 1 | 新開班！可報名 | https://forms.gle/mQM7UX812GQXvXhA7 | 2 | ✓ |
| 三級班 | 週四 | 三級 | 20:00-21:30 | 2 | 目前進度及報名請私訊老師詢問 | | 3 | ✓ |

## Step 3: Create the Resources Database

### 3.1 Create database

1. In your Notion workspace, create another new database
2. Name it "Resources"
3. Share it with your integration (same process as above)

### 3.2 Set up database properties

| Property Name | Type | Description |
|---------------|------|-------------|
| Title | Title | Resource title |
| Description | Text | Resource description |
| Category | Text | Category (e.g., "教材", "工具") |
| Link | URL | Link to resource |
| Image | Text | Image URL |
| Order | Number | Display order (ascending) |
| Published | Checkbox | Show/hide this resource |

### 3.3 Add sample data

| Title | Description | Category | Link | Image | Order | Published |
|-------|-------------|----------|------|-------|-------|-----------|
| TTMIK 韓文 | 免費線上韓文課程 | 教材 | https://www.talktomedaily.com | https://example.com/image.jpg | 1 | ✓ |

## Step 4: Create the Deals Database

### 4.1 Create database

1. Create another new database
2. Name it "Deals"
3. Share it with your integration

### 4.2 Set up database properties

| Property Name | Type | Description |
|---------------|------|-------------|
| Title | Title | Deal title |
| Description | Text | Deal description |
| Link | URL | Link to deal |
| Image | Text | Image URL |
| Order | Number | Display order (ascending) |
| Published | Checkbox | Show/hide this deal |

### 4.3 Add sample data

| Title | Description | Link | Image | Order | Published |
|-------|-------------|------|-------|-------|-----------|
| 限時優惠課程 | 新生報名享9折優惠 | https://example.com | https://example.com/image.jpg | 1 | ✓ |

## Step 5: Get Database IDs

### How to find your database ID

1. Open your database in Notion
2. Look at the URL in your browser
3. The database ID is the long alphanumeric string after `/` and before `?v=`

**URL format:**
```
https://www.notion.so/WORKSPACE_ID/DATABASE_ID?v=VIEW_ID
```

**Example:**
If your URL is: `https://www.notion.so/myworkspace/a1b2c3d4e5f6g7h8i9j0k1l2?v=123456789`

Then your DATABASE_ID is: `a1b2c3d4e5f6g7h8i9j0k1l2`

### Copy your database IDs

1. **Courses Database ID:** Copy this as `NOTION_DATABASE_ID_COURSES`
2. **Resources Database ID:** Copy this as `NOTION_DATABASE_ID_RESOURCES`
3. **Deals Database ID:** Copy this as `NOTION_DATABASE_ID_DEALS`

## Step 6: Configure Environment Variables

### Create `.env.local` file

In the root of your project, create a `.env.local` file:

```bash
# Notion Configuration
NOTION_API_KEY=your-integration-token
NOTION_DATABASE_ID_COURSES=your-courses-db-id
NOTION_DATABASE_ID_RESOURCES=your-resources-db-id
NOTION_DATABASE_ID_DEALS=your-deals-db-id

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
ADMIN_PASSWORD=your-secure-password
```

Replace the placeholders with your actual values:
- `your-integration-token` - Your Notion integration token from Step 1
- `your-courses-db-id` - Your Courses database ID from Step 5
- `your-resources-db-id` - Your Resources database ID from Step 5
- `your-deals-db-id` - Your Deals database ID from Step 5
- `your-secure-password` - A strong password for the admin panel

## Step 7: Test Your Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000
3. You should see your courses, resources, and deals displayed on the site

4. To verify the API is working:
   - Visit http://localhost:3000/api/content
   - You should see JSON data from your Notion databases

## Troubleshooting

### "Error fetching content" or empty sections

**Problem:** Your data isn't showing up on the site.

**Solutions:**
1. Check that the `Published` checkbox is enabled for each item
2. Verify all environment variables are set correctly in `.env.local`
3. Check the browser console for error messages
4. Check terminal/console for server-side errors
5. Make sure your integration has "Editor" permission on all databases

### "NOTION_API_KEY is not set"

**Solution:** Make sure you've added `NOTION_API_KEY` to your `.env.local` file and restarted the dev server.

### "NOTION_DATABASE_ID_COURSES is not set"

**Solution:** Make sure you've correctly copied the database IDs from Notion and added them to `.env.local`.

### Property names don't match

**Problem:** API returns `null` for property values.

**Solution:** Make sure your Notion database property names match exactly:
- `Name` (for courses)
- `Day` (for courses)
- `Level` (for courses)
- `Time` (for courses)
- `Available Spots` (for courses)
- `Description`
- `Registration Link` (for courses)
- `Title` (for resources and deals)
- `Category` (for resources)
- `Link`
- `Image`
- `Order`
- `Published`

Property names are case-sensitive!

## Updating Content

### Adding a new course

1. Open your Courses database in Notion
2. Click "Add a new row"
3. Fill in all the required fields
4. Set `Published` to checked
5. Set an `Order` number
6. The site will automatically pull this data within 5 minutes (or refresh manually)

### Removing a course

1. Uncheck the `Published` checkbox
2. The course will disappear from the site within 5 minutes

### Temporarily hiding content

Just uncheck the `Published` checkbox - this is easier than deleting entries.

## Advanced Tips

### Sorting your content

Use the `Order` property to control the display order:
- 1, 2, 3, etc. (ascending order)
- Items with lower numbers appear first
- Leave blank or use high numbers to hide

### Sharing with team members

1. Go to your database in Notion
2. Click "Share"
3. Add team members with appropriate permissions
4. They can edit the database without needing API access

### Performance considerations

- The site caches content for 5 minutes by default
- To change this, edit `next: { revalidate: 300 }` in `app/page.tsx`
- Use 300 for 5 minutes, 60 for 1 minute, 0 to disable caching

## Next Steps

- [Deployment Guide](./DEPLOYMENT.md) - Deploy your site to Vercel
- [Admin Guide](./ADMIN_GUIDE.md) - Manage your content
- [README](./README.md) - Project overview
