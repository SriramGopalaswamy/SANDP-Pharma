
import { SpecSection } from './types';

export const ACTION_ITEMS = [
  "Approve pilot region (Karnataka) + 50 pilot retailers.",
  "Approve Credit Policy Template & Risk Thresholds.",
  "Sign agreements with Stripe (Payments) & Shiprocket (Logistics).",
  "Assign 1 dedicated Sales Rep to manage pilot relationships.",
  "Provide Product Masterfeed (CSV/Excel) for initial catalog seeding."
];

export const SPEC_SECTIONS: SpecSection[] = [
  {
    id: 'exec-summary',
    title: '1. Executive Summary',
    type: 'text',
    content: `SANDP Pharma aims to modernize the B2B pharmaceutical supply chain by launching a centralized e-commerce platform hosted on AWS. This platform will serve licensed retailers and internal ops, replacing fragmented phone/WhatsApp ordering with a streamlined digital experience. 
    
    For retailers, this provides real-time stock visibility, credit management, and faster fulfillment. For SANDP, it drives higher AOV through smart suggestions, reduces operational overhead, and ensures compliance. The platform differentiates itself via: (1) Real-time multi-warehouse stock sync, (2) Integrated credit line management, (3) Smart drug substitution logic, (4) Automated compliance checks (DEA/License), and (5) A robust loyalty engine.`
  },
  {
    id: 'personas',
    title: '2. User Personas',
    type: 'mixed',
    content: 'Key stakeholders for the platform:',
    subsections: [
      {
        title: "Raj (Store Owner)",
        content: "Goals: Maximize margins, manage credit flow. Pain: Can't track invoices, misses bulk deals. Task: Checks 'Credit Limit', approves bulk order prepared by pharmacist."
      },
      {
        title: "Priya (Pharmacist)",
        content: "Goals: Quick stock check, fast reordering. Pain: Distributors out of stock without warning. Task: Scans barcode of empty box to reorder, accepts generic substitute."
      },
      {
        title: "Mike (SANDP Admin)",
        content: "Goals: Order throughput, catalog accuracy. Pain: Manual KYC verification. Task: Reviews uploaded Drug License, approves retailer account."
      },
      {
        title: "Sarah (Finance)",
        content: "Goals: Reconciliation, credit risk mitigation. Task: Sets credit limits for new accounts, reviews aged receivables."
      }
    ]
  },
  {
    id: 'features',
    title: '3. Feature List (Prioritized)',
    type: 'mixed',
    content: 'MVP vs Phase 2 breakdown.',
    subsections: [
      {
        title: "MVP (Pilot Must-Haves)",
        content: "• Catalog: ElasticSearch-based search, Filters (Brand/Generic).\n• Product Substitutions: Logic to suggest generic alternatives. AC: If Brand X is out of stock, the displayed list must show generic equivalents sorted by margin. UI Hint: Suggest a button like 'Switch to Generic' with a 'Save 20%' badge.\n• Stock: Real-time visibility per DC.\n• Ordering: Cart, Checkout, Bulk Upload, Barcode Scan.\n• Payments: Net Terms (Credit), UPI/Cards (Stripe/Razorpay).\n• Admin: Order processing, Inventory view, KYC approval workflow.\n• Compliance: License upload & blocking logic."
      },
      {
        title: "Phase 2 (Advanced)",
        content: "• AI Forecasting for Retailers (Restock alerts).\n• Dynamic Pricing Engine (Personalized discounts).\n• Multi-tier Returns Workflow.\n• Route Optimization for delivery fleet."
      }
    ]
  },
  {
    id: 'data-model',
    title: '4. Data Model',
    type: 'code',
    content: `
// Core Entities

// Retailer
{
  "id": "ret_123",
  "businessName": "City Pharma",
  "licenseNumber": "DL-KA-01-2024",
  "kycStatus": "APPROVED",
  "creditLimit": 500000,
  "availableCredit": 120000
}

// Order
{
  "id": "ord_999",
  "retailerId": "ret_123",
  "status": "PROCESSING",
  "items": [
    { "sku": "SKU_PCM_500", "qty": 100, "price": 125.00 }
  ],
  "total": 12500.00,
  "paymentTerm": "NET_30"
}
    `
  },
  {
    id: 'architecture',
    title: '5. System Architecture',
    type: 'list',
    content: [
      "Frontend: React (Web Admin) + React Native (Mobile App) -> Hosted on AWS Amplify / S3 + CloudFront.",
      "API Layer: AWS API Gateway -> AWS Lambda (Serverless Node.js).",
      "Core DB: Amazon Aurora PostgreSQL (Relational Data: Orders, Retailers, Inventory).",
      "Cache/Cart: Amazon DynamoDB (High velocity cart sessions, Audit logs).",
      "Search: Amazon OpenSearch Service (Catalog, fuzzy search, substitutions).",
      "Async Ops: Amazon EventBridge (Order placement events) -> SQS -> Lambda (ERP Sync, Notifications).",
      "Storage: S3 (Product Images, KYC Documents - Encrypted)."
    ]
  },
  {
    id: 'integration',
    title: '6. Integration Spec',
    type: 'list',
    content: [
      "Payment Gateway: Stripe or Razorpay. Integration Mode: Tokenized (PCI-DSS SAQ A). Webhooks for payment success/fail.",
      "Logistics: Shiprocket/EasyPost API. Push tracking updates to SNS -> Retailer App Push Notification.",
      "ERP: Inbound Inventory (Webhooks/File Drop), Outbound Orders (SQS Queue to prevent throttling)."
    ]
  },
  {
    id: 'security',
    title: '7. Security & Compliance',
    type: 'list',
    content: [
      "Auth: AWS Cognito with MFA enforced for Admin roles.",
      "Data: TLS 1.2+ in transit. KMS encryption for S3 (KYC docs) and DB at rest.",
      "Access: Role-Based Access Control (RBAC) - Store Manager vs Pharmacist.",
      "Audit: AWS CloudTrail for infra, DynamoDB table for application-level audit logs (Who changed the credit limit?)."
    ]
  },
  {
    id: 'runbook',
    title: '8. Admin & Ops Runbook',
    type: 'mixed',
    content: 'Standard Operating Procedures:',
    subsections: [
      {
        title: "Retailer Onboarding (Admin KYC Workflow)",
        content: `**Step 1: Queue & Document Intake (View: Admin Dashboard > 'Pending Approvals')**
        - Admin selects a retailer from the 'KYC Pending' list.
        - System displays split-screen view: Uploaded Documents (Left) vs. Data Entry Form (Right).

        **Step 2: Drug License (DL) & Compliance Validation**
        - **Document Validity**: Ensure DL (Forms 20/21) is clear, un-cropped, and legible.
        - **Field Level Checks**:
           1. **License Number**: Cross-reference format (e.g., KA-B32-...) with State Drug Controller database.
           2. **Firm Name**: Must strictly match the GSTIN/PAN registration name.
           3. **Competent Person**: Verify the Pharmacist-in-Charge name is listed.
           4. **Validity**: If expiring < 90 days, Approve with 'Provisional' status and set reminder.
           5. **Address**: GPS coordinates of shop (from app) should match DL address vicinity.

        **Step 3: Credit Risk Assessment (Tool: Finance Risk Engine)**
        - **Prepaid Tier**: Default for all new accounts (< 3 months vintage). Payment via UPI/Card only.
        - **Credit Tier 1 (₹1L - ₹5L)**:
           - Criteria: 6+ months of Prepaid history OR Valid Bank Reference Letter.
           - Terms: Net 7 Days.
        - **Credit Tier 2 (₹5L+)**:
           - Criteria: 3+ Years in business + External Credit Score > 750 + Physical Shop Visit verification.
           - Terms: Net 21 Days.

        **Step 4: Final Decision & Notification**
        - **Approve**: Generates ERP Customer ID, sends Welcome Email/SMS, and enables 'Order' tab.
        - **Reject**: Admin selects reason (e.g., 'Name Mismatch', 'Blurred Doc'). System sends 'Resubmit' link to retailer.`
      },
      {
        title: "Inventory Sync Issues",
        content: "If Shopify/ERP mismatch > 5%: Pause ordering for SKU. Trigger full re-sync job via Admin Panel."
      }
    ]
  },
  {
    id: 'kpis',
    title: '9. Monitoring & KPIs',
    type: 'list',
    content: [
      "Business: GMV (Gross Merchandise Value), AOV, Order Frequency, Credit Utilization %.",
      "Operational: Order-to-Ship Time, Fill Rate (Ordered vs Delivered).",
      "Technical: API Latency (p99 < 500ms), 5xx Error Rate (< 0.1%)."
    ]
  },
  {
    id: 'loyalty',
    title: '10. Loyalty & Promotions',
    type: 'text',
    content: `Engine needs to be decoupled from Cart. 
    Rule Types: 
    1. Cart Value: "5% off if Order > ₹50,000".
    2. SKU Specific: "Buy 10 Get 1 Free on Brand X".
    3. Loyalty: 1 Point per ₹100 spent. Redeem 100 Points = ₹50 Credit.
    Expiration: Points expire rolling 12 months.`
  },
  {
    id: 'mobile',
    title: '11. Mobile UX Notes',
    type: 'list',
    content: [
      "Offline-First: Catalog checks should work on cached data. Add to cart works offline -> Syncs when online.",
      "Scanner: Prominent floating action button for Barcode Scanner in 'Order' tab.",
      "Quick Re-order: 'Buy Again' carousel on Home Screen."
    ]
  },
  {
    id: 'deployment',
    title: '12. Deployment & IaC',
    type: 'text',
    content: "Use Terraform for all infra. Modules: vpc, rds, lambda, cognito. CI/CD via GitHub Actions. Strategy: Blue/Green deployment for critical API services to ensure zero downtime during swaps."
  },
  {
    id: 'rollout',
    title: '13. Operational Rollout Plan',
    type: 'list',
    content: [
      "Phase 1 (Pilot): 1 Region, 50 Friendly Retailers. Manual ERP sync allowed. Team: 1 PM, 2 Fullstack Devs, 1 Ops Lead.",
      "Phase 2 (Beta): 3 Regions, 500 Retailers. Auto ERP sync. Add Mobile App. Team: +2 Mobile Devs, +1 QA.",
      "Phase 3 (GA): All regions. Marketing Push. Team: Full Squad."
    ]
  },
  {
    id: 'risks',
    title: '14. Risks & Mitigations',
    type: 'mixed',
    content: 'Critical risks to monitor:',
    subsections: [
      { title: "Credit Default", content: "Mitigation: Strict credit limits, auto-hold on orders if overdue invoices exist > 7 days." },
      { title: "Stock Mismatch", content: "Mitigation: Safety stock buffers (display 90% of actual stock)." }
    ]
  },
  {
    id: 'api-sample',
    title: '15. Appendix: Sample API',
    type: 'code',
    content: `
POST /api/v1/orders
Headers: Authorization: Bearer <token>
Body:
{
  "items": [
    { "sku": "SKU_123", "qty": 50 }
  ],
  "shippingAddressId": "addr_01",
  "paymentMethod": "CREDIT_TERMS"
}

Response (201):
{
  "orderId": "ord_9090",
  "status": "PENDING_APPROVAL",
  "estimatedDelivery": "2023-10-25T14:00:00Z"
}
    `
  }
];
