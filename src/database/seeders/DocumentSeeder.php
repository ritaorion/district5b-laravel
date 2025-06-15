<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting Documents seeder...');

        $documents = [
            [
                'file_name' => '1743621362_AA-Member-Resource-Flyer.pdf',
                'original_file_name' => 'AA-Member-Resource-Flyer.pdf',
                'file_size' => 110201,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743621362_AA-Member-Resource-Flyer.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:16:03',
                'updated_at' => '2025-04-02 19:16:03',
            ],
            [
                'file_name' => '1743622783_AA-Service-Manual-2024-BM-31.pdf',
                'original_file_name' => 'AA-Service-Manual-2024-BM-31.pdf',
                'file_size' => 14788975,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622783_AA-Service-Manual-2024-BM-31.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:39:49',
                'updated_at' => '2025-04-02 19:39:49',
            ],
            [
                'file_name' => '1743622795_Group-Contributions.pdf',
                'original_file_name' => 'Group-Contributions.pdf',
                'file_size' => 48244,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622795_Group-Contributions.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:39:56',
                'updated_at' => '2025-04-02 19:39:56',
            ],
            [
                'file_name' => '1743622800_Group-Information-Change-Form.pdf',
                'original_file_name' => 'Group-Information-Change-Form.pdf',
                'file_size' => 170438,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622800_Group-Information-Change-Form.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:01',
                'updated_at' => '2025-04-02 19:40:01',
            ],
            [
                'file_name' => '1743622806_GSR-Orientation-Manual.pdf',
                'original_file_name' => 'GSR-Orientation-Manual.pdf',
                'file_size' => 1712537,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622806_GSR-Orientation-Manual.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:07',
                'updated_at' => '2025-04-02 19:40:07',
            ],
            [
                'file_name' => '1743622812_New-Group-Listing-Guidelines-Form.pdf',
                'original_file_name' => 'New-Group-Listing-Guidelines-Form.pdf',
                'file_size' => 274756,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622812_New-Group-Listing-Guidelines-Form.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:12',
                'updated_at' => '2025-04-02 19:40:12',
            ],
            [
                'file_name' => '1743622817_New-GSR-Checklist.pdf',
                'original_file_name' => 'New-GSR-Checklist.pdf',
                'file_size' => 30306,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622817_New-GSR-Checklist.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:17',
                'updated_at' => '2025-04-02 19:40:17',
            ],
            [
                'file_name' => '1743622821_New-Meeting-Form.pdf',
                'original_file_name' => 'New-Meeting-Form.pdf',
                'file_size' => 244625,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622821_New-Meeting-Form.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:22',
                'updated_at' => '2025-04-02 19:40:22',
            ],
            [
                'file_name' => '1743622826_Roberts-Rules-Overview.pdf',
                'original_file_name' => 'Roberts-Rules-Overview.pdf',
                'file_size' => 137656,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622826_Roberts-Rules-Overview.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:27',
                'updated_at' => '2025-04-02 19:40:27',
            ],
            [
                'file_name' => '1743622831_Sample-GSR-Report.pdf',
                'original_file_name' => 'Sample-GSR-Report.pdf',
                'file_size' => 25413,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1743622831_Sample-GSR-Report.pdf',
                'is_public' => true,
                'created_at' => '2025-04-02 19:40:32',
                'updated_at' => '2025-04-02 19:40:32',
            ],
            [
                'file_name' => '1747952692_Acronyms1.pdf',
                'original_file_name' => 'Acronyms 1.pdf',
                'file_size' => 447718,
                'mime_type' => 'application/pdf',
                'app_type' => 'file',
                'uploaded_by' => 1,
                'storage_path' => 'resources/1747952692_Acronyms1.pdf',
                'is_public' => false,
                'created_at' => '2025-05-22 22:24:53',
                'updated_at' => '2025-05-22 22:24:53',
            ],
        ];

        $documentsCount = 0;

        foreach ($documents as $documentData) {
            try {
                Document::create($documentData);
                $documentsCount++;
            } catch (\Exception $e) {
                $this->command->error('Error inserting document: ' . $e->getMessage());
                $this->command->error('Data: ' . json_encode($documentData));
            }
        }

        $this->command->info("Documents seeder completed!");
        $this->command->info("✅ Successfully imported: {$documentsCount} documents");
    }
}
