const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({
    service: 'Company Scraper API',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    message: '企業情報収集APIが正常に動作しています'
  });
});

// 企業情報収集API
app.post('/api/scrape', (req, res) => {
  try {
    const { companyName, websiteUrl, testMode = true } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        error: '企業名が必要です'
      });
    }

    console.log(`🔍 企業情報収集: ${companyName}`);

    // テストデータ生成
    const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    const result = {
      success: true,
      data: {
        companyName: companyName,
        websiteUrl: websiteUrl || null,
        emails: [
          `info@${sanitizedName}.com`,
          `contact@${sanitizedName}.com`,
          `sales@${sanitizedName}.com`
        ],
        representative: `代表取締役 ${companyName.charAt(0)}田太郎`,
        phone: '03-1234-5678',
        address: '東京都渋谷区恵比寿1-1-1',
        industry: 'IT・情報サービス',
        revenue: '100億円',
        employees: '500人',
        foundedYear: '2000年',
        confidence: 4,
        processingTime: Math.floor(Math.random() * 2000) + 1000,
        extractedAt: new Date().toISOString(),
        source: 'test_data'
      }
    };

    res.json(result);

  } catch (error) {
    console.error('❌ API エラー:', error);
    res.status(500).json({
      success: false,
      error: error.message || '企業情報の収集中にエラーが発生しました',
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Company Scraper API 起動完了`);
  console.log(`📍 ポート: ${port}`);
  console.log(`🌐 ヘルスチェック: GET /`);
  console.log(`🔍 企業情報収集: POST /api/scrape`);
});

module.exports = app;
