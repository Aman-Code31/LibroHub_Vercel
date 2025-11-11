# Deploy to Vercel - PowerShell Script

Write-Host "🚀 Deploying Library Management System to Vercel..." -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy Backend
Write-Host "📦 Step 1: Deploying Backend..." -ForegroundColor Cyan
Write-Host "This will deploy your API server with SQLite database" -ForegroundColor Gray
Write-Host ""

cd backend
Write-Host "Running: vercel --prod" -ForegroundColor Gray
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend deployed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 IMPORTANT: Copy your backend URL from above!" -ForegroundColor Yellow
    Write-Host "   Example: https://library-backend-xyz.vercel.app" -ForegroundColor Gray
    Write-Host ""
    
    $backendUrl = Read-Host "Paste your backend URL here"
    
    if ($backendUrl) {
        # Update Frontend Config
        Write-Host ""
        Write-Host "⚙️  Step 2: Updating Frontend Configuration..." -ForegroundColor Cyan
        cd ../frontend
        
        $configPath = "scripts/config.js"
        $configContent = Get-Content $configPath -Raw
        
        # Update BASE_URL
        $configContent = $configContent -replace "BASE_URL: '[^']*'", "BASE_URL: '$backendUrl'"
        Set-Content $configPath $configContent
        
        Write-Host "✅ Frontend configuration updated!" -ForegroundColor Green
        Write-Host ""
        
        # Deploy Frontend
        Write-Host "🌐 Step 3: Deploying Frontend..." -ForegroundColor Cyan
        Write-Host "This will deploy your website" -ForegroundColor Gray
        Write-Host ""
        
        Write-Host "Running: vercel --prod" -ForegroundColor Gray
        vercel --prod
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "📝 Copy your frontend URL from above!" -ForegroundColor Yellow
            Write-Host "   Example: https://library-frontend-xyz.vercel.app" -ForegroundColor Gray
            Write-Host ""
            
            $frontendUrl = Read-Host "Paste your frontend URL here"
            
            if ($frontendUrl) {
                Write-Host ""
                Write-Host "⚙️  Step 4: Updating Backend CORS..." -ForegroundColor Cyan
                cd ../backend
                
                $serverPath = "server.js"
                $serverContent = Get-Content $serverPath -Raw
                
                # Add frontend URL to CORS
                $corsPattern = 'origin: \[([^\]]*)\]'
                if ($serverContent -match $corsPattern) {
                    $currentOrigins = $Matches[1]
                    if ($currentOrigins -notmatch [regex]::Escape($frontendUrl)) {
                        $newOrigins = "$currentOrigins, `"$frontendUrl`""
                        $serverContent = $serverContent -replace $corsPattern, "origin: [$newOrigins]"
                        Set-Content $serverPath $serverContent
                        
                        Write-Host "✅ CORS updated with frontend URL!" -ForegroundColor Green
                        Write-Host ""
                        Write-Host "🔄 Step 5: Redeploying Backend with CORS update..." -ForegroundColor Cyan
                        vercel --prod
                        
                        if ($LASTEXITCODE -eq 0) {
                            Write-Host ""
                            Write-Host "🎉 ===========================================" -ForegroundColor Green
                            Write-Host "🎉  DEPLOYMENT COMPLETE!" -ForegroundColor Green
                            Write-Host "🎉 ===========================================" -ForegroundColor Green
                            Write-Host ""
                            Write-Host "📱 Your Application URLs:" -ForegroundColor Cyan
                            Write-Host "   Frontend: $frontendUrl" -ForegroundColor White
                            Write-Host "   Backend:  $backendUrl" -ForegroundColor White
                            Write-Host ""
                            Write-Host "🌐 Visit your frontend URL to use the app!" -ForegroundColor Yellow
                            Write-Host ""
                            Write-Host "⚠️  NOTE: Database changes on Vercel are ephemeral" -ForegroundColor Yellow
                            Write-Host "   Data will reset when the serverless function restarts" -ForegroundColor Gray
                            Write-Host "   For persistent storage, consider using a cloud database" -ForegroundColor Gray
                        }
                    }
                }
            }
        } else {
            Write-Host "❌ Frontend deployment failed!" -ForegroundColor Red
        }
    }
} else {
    Write-Host "❌ Backend deployment failed!" -ForegroundColor Red
}

Write-Host ""
Write-Host "📚 For more help, see DEPLOY_VERCEL.md" -ForegroundColor Gray

cd ..
