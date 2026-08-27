# Log of Changes

Here is the comprehensive list of all the files and line numbers that were modified during our session. This can be used as a reference to revert or check specific modifications.

## 1. Footer Links & UI fixes
**File:** `d:\DomeLink-main\domelink\frontend\src\components\layout\Footer.tsx`
- **Line ~31**: Imported `useAuth` hook from `@/hooks/useAuth`.
- **Line ~39**: Initialized `const { isLoggedIn } = useAuth();`
- **Line ~41**: Appended `mt-auto` to the outer `<footer className="...">` to fix the footer positioning.
- **Line ~84**: Changed `to="/find-architects"` to `to="/explore"`
- **Line ~102**: Added `{!isLoggedIn && (...)}` to conditionally hide the "Create Account / Sign In" block if the user is already authenticated.
- **Line ~139 & 144**: Updated two footer navigation links from `/find-architects` to `/explore`.

## 2. Avora Estimate Validation & Missing Exit Option
**File:** `d:\DomeLink-main\domelink\frontend\src\pages\homeowner\AvoraEstimate.tsx`
- **Line ~305**: Updated `canContinue()` logic to validate budget: `Number(form.budgetMin) > 0 && Number(form.budgetMax) >= Number(form.budgetMin)`.
- **Line ~476 & 524**: Replaced `/find-architects` with `/explore`.
- **Lines ~700-717**: Updated the onboarding buttons. If `stepIndex === 0`, rendered an `Exit` button (`onClick={() => navigate("/")}`) instead of the disabled `Back` button.

## 3. Mock Authentication Bypass
**File:** `d:\DomeLink-main\domelink\frontend\src\context\AuthContext.tsx`
- **Lines ~40-60**: Bypassed database-dependent logic in the `login()` function. Added hardcoded checks for `test@test.com` with password `test`. Included localstorage (`api.setToken("mock_token")`) and mock `ApiUser` assignment.
- **Lines ~25-30**: Created `useEffect` logic to check `localStorage.getItem("domelink_token") === "mock_token"` on application load to immediately mock the current session without the database.

## 4. Header Visibility & Transparent Logo
**File:** `d:\DomeLink-main\domelink\frontend\src\components\layout\Header.tsx`
- **Lines ~61-68**: Updated the `navTone` constants. Added `drop-shadow-md font-medium text-white` for dark contexts, and `font-medium text-black` for light contexts to dramatically increase header visibility.
- **Line ~182**: Appended the `mix-blend-multiply` CSS class to the `<img />` tag for the DomeLink logo to remove the white background.

## 5. Pricing Page Text Alignment (Hero Layout)
**File:** `d:\DomeLink-main\domelink\frontend\src\components\layout\DomeHero.tsx`
- **Lines ~26-30**: Added Flexbox alignment logic: `align === "center" && "items-center text-center max-w-4xl mx-auto flex flex-col justify-center"`.

**File:** `d:\DomeLink-main\domelink\frontend\src\components\layout\Parallax.tsx`
- **Line ~18**: Appended `w-full flex items-center` to the wrapping motion div to support centered `DomeHero` contexts.

## 6. Invisible Loading Text 
**File:** `d:\DomeLink-main\domelink\frontend\src\components\3d\LoaderScene.tsx`
- **Lines ~29-37**: Wrapped `<LoaderScene3D />` in a flex-container and moved the `<span className="...">Loading DomeLink...</span>` text so it renders persistently *below* the 3D canvas instead of being unmounted by it.

## 7. Missing Exit Option in Homeowner Onboarding
**File:** `d:\DomeLink-main\domelink\frontend\src\pages\homeowner\HomeownerOnboarding.tsx`
- **Lines ~475-495**: Updated the navigation buttons. When `stepIndex === 0`, it renders a functional `Exit` button instead of a disabled `Back` button.

## 8. Dashboard Data & API Mocking (403 Error Fixes)
**File:** `d:\DomeLink-main\domelink\frontend\src\lib\api.ts`
- **Lines ~763-773**: Mocked `updateMe()` to intercept save requests and return a resolved promise to prevent frontend crashing on save.
- **Lines ~943-953**: Mocked `getConsultations()` to return dummy "Active Conversations" array (containing a mocked Studio Morphe request) if `mock_token` is present.
- **Lines ~1041-1059**: Mocked `getSavedArchitects()` to return a dummy array.
- **Lines ~1236-1275**: Mocked `generateAvoraEstimate()` to intercept submissions. If `mock_token` is present, it skips the backend `/api/estimates/avora` request (which was causing 403s) and calculates a dummy generated Avora report using math directly on the frontend.

## 9. Dashboard Preferences Missing State
**File:** `d:\DomeLink-main\domelink\frontend\src\pages\ProfileSettings.tsx`
- **Lines ~12-40**: Added `city`, `projectType`, and `preferredStyles` to form state and `useEffect` population hooks.
- **Lines ~158-204**: Conditionally rendered a "Project Preferences" section for homeowners to update these fields if their role is `CLIENT`.
- **Line ~45**: Added formatting to map comma-separated `preferredStyles` into an array for the save mutation.

**File:** `d:\DomeLink-main\domelink\frontend\src\pages\HomeownerDashboard.tsx`
- **Lines ~152-166**: Wrapped the "Not set" text with `<Link to="/profile/settings">` tags and added a hover-based "Edit" button to the summary cards.
