import React, { useMemo, useState } from 'react';
import {
    Button,
    Select,
    SelectItem,
    TextInput,
    TextArea,
    Tile,
    Tag,
    DatePicker,
    DatePickerInput,
} from '@carbon/react';
import { Add, ImageMedical, Document, Search, Notebook } from '@carbon/icons-react';
import '../orthanc-dashboard.scss';
type ImagingRequest = {
    id: string;
    patientId: string;
    patientName: string;
    studyType: string;
    modality: 'X-Ray' | 'CT' | 'MRI' | 'Ultrasound';
    bodyPart: string;
    priority: 'Routine' | 'Urgent' | 'STAT';
    requestDate: string;
    status: 'Pending' | 'Scheduled' | 'Completed';
    clinicalNotes: string;
};

const initialRequests: ImagingRequest[] = [
    {
        id: 'IMG-001',
        patientId: 'P-1001',
        patientName: 'Ram Thapa',
        studyType: 'Chest Imaging',
        modality: 'X-Ray',
        bodyPart: 'Chest',
        priority: 'Routine',
        requestDate: '2026-03-31',
        status: 'Pending',
        clinicalNotes: 'Persistent cough and fever for 5 days.',
    },
    {
        id: 'IMG-002',
        patientId: 'P-1002',
        patientName: 'Sita Sharma',
        studyType: 'Brain Scan',
        modality: 'MRI',
        bodyPart: 'Brain',
        priority: 'Urgent',
        requestDate: '2026-03-30',
        status: 'Scheduled',
        clinicalNotes: 'Recurrent headache with blurred vision.',
    },
];

const OrthancDashboard: React.FC = () => {
    const [requests, setRequests] = useState<ImagingRequest[]>(initialRequests);

    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        studyType: '',
        modality: 'X-Ray',
        bodyPart: '',
        priority: 'Routine',
        requestDate: '',
        clinicalNotes: '',
    });

    const totalRequests = requests.length;
    const pendingRequests = requests.filter((item) => item.status === 'Pending').length;
    const completedRequests = requests.filter((item) => item.status === 'Completed').length;

    const recentRequests = useMemo(() => requests.slice().reverse(), [requests]);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (
            !formData.patientId ||
            !formData.patientName ||
            !formData.studyType ||
            !formData.modality ||
            !formData.bodyPart ||
            !formData.priority ||
            !formData.requestDate
        ) {
            alert('Please fill all required fields.');
            return;
        }

        const newRequest: ImagingRequest = {
            id: `IMG-${String(requests.length + 1).padStart(3, '0')}`,
            patientId: formData.patientId,
            patientName: formData.patientName,
            studyType: formData.studyType,
            modality: formData.modality as ImagingRequest['modality'],
            bodyPart: formData.bodyPart,
            priority: formData.priority as ImagingRequest['priority'],
            requestDate: formData.requestDate,
            status: 'Pending',
            clinicalNotes: formData.clinicalNotes,
        };

        setRequests((prev) => [...prev, newRequest]);

        setFormData({
            patientId: '',
            patientName: '',
            studyType: '',
            modality: 'X-Ray',
            bodyPart: '',
            priority: 'Routine',
            requestDate: '',
            clinicalNotes: '',
        });
    };

    return (
        <div className="orthanc-dashboard">
            <div className="orthanc-dashboard__header">
                <div>
                    <p className="orthanc-dashboard__eyebrow">Radiology / Orthanc Module</p>
                    <h1 className="orthanc-dashboard__title">Orthanc Dashboard</h1>
                    <p className="orthanc-dashboard__subtitle">
                        Manage imaging requests, DICOM workflow, and radiology-related data from one place.
                    </p>
                </div>

                <div className="orthanc-dashboard__actions">
                    <Button kind="secondary" renderIcon={Notebook}>
                        Open Studies
                    </Button>
                    <Button renderIcon={Search}>View Viewer</Button>
                </div>
            </div>

            <div className="orthanc-dashboard__summary-grid">
                <Tile className="orthanc-dashboard__summary-card">
                    <div className="orthanc-dashboard__summary-top">
                        <ImageMedical size={20} />
                        <span>Total Requests</span>
                    </div>
                    <h2>{totalRequests}</h2>
                    <p>All imaging requests recorded</p>
                </Tile>

                <Tile className="orthanc-dashboard__summary-card">
                    <div className="orthanc-dashboard__summary-top">
                        <Document size={20} />
                        <span>Pending</span>
                    </div>
                    <h2>{pendingRequests}</h2>
                    <p>Waiting for radiology workflow</p>
                </Tile>

                <Tile className="orthanc-dashboard__summary-card">
                    <div className="orthanc-dashboard__summary-top">
                        <Add size={20} />
                        <span>Completed</span>
                    </div>
                    <h2>{completedRequests}</h2>
                    <p>Finished imaging requests</p>
                </Tile>
            </div>

            <Tile className="orthanc-dashboard__form-section">
                <div className="orthanc-dashboard__section-header">
                    <div>
                        <h2>Orthanc Imaging Request Form</h2>
                        <p>Create a radiology / imaging request directly from this page.</p>
                    </div>
                </div>

                <div className="orthanc-dashboard__form-grid">
                    <TextInput
                        id="patientId"
                        labelText="Patient ID"
                        placeholder="Enter patient ID"
                        value={formData.patientId}
                        onChange={(e) => handleChange('patientId', e.target.value)}
                    />

                    <TextInput
                        id="patientName"
                        labelText="Patient Name"
                        placeholder="Enter patient name"
                        value={formData.patientName}
                        onChange={(e) => handleChange('patientName', e.target.value)}
                    />

                    <TextInput
                        id="studyType"
                        labelText="Study Type"
                        placeholder="e.g. Chest Imaging"
                        value={formData.studyType}
                        onChange={(e) => handleChange('studyType', e.target.value)}
                    />

                    <TextInput
                        id="bodyPart"
                        labelText="Body Part"
                        placeholder="e.g. Chest, Brain, Abdomen"
                        value={formData.bodyPart}
                        onChange={(e) => handleChange('bodyPart', e.target.value)}
                    />

                    <Select
                        id="modality"
                        labelText="Modality"
                        value={formData.modality}
                        onChange={(e) => handleChange('modality', e.target.value)}
                    >
                        <SelectItem text="X-Ray" value="X-Ray" />
                        <SelectItem text="CT" value="CT" />
                        <SelectItem text="MRI" value="MRI" />
                        <SelectItem text="Ultrasound" value="Ultrasound" />
                    </Select>

                    <Select
                        id="priority"
                        labelText="Priority"
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                    >
                        <SelectItem text="Routine" value="Routine" />
                        <SelectItem text="Urgent" value="Urgent" />
                        <SelectItem text="STAT" value="STAT" />
                    </Select>

                    <div className="orthanc-dashboard__date-field">
                        <DatePicker
                            datePickerType="single"
                            dateFormat="Y-m-d"
                            onChange={(_, dateStr) => handleChange('requestDate', String(dateStr))}
                        >
                            <DatePickerInput
                                id="requestDate"
                                labelText="Request Date"
                                placeholder="yyyy-mm-dd"
                            />
                        </DatePicker>
                    </div>
                </div>

                <div className="orthanc-dashboard__notes">
                    <TextArea
                        id="clinicalNotes"
                        labelText="Clinical Notes / Indication"
                        placeholder="Enter reason for imaging request..."
                        rows={4}
                        value={formData.clinicalNotes}
                        onChange={(e) => handleChange('clinicalNotes', e.target.value)}
                    />
                </div>

                <div className="orthanc-dashboard__form-actions">
                    <Button onClick={handleSubmit}>Submit Imaging Request</Button>
                </div>
            </Tile>

            <Tile className="orthanc-dashboard__requests-section">
                <div className="orthanc-dashboard__section-header">
                    <div>
                        <h2>Recent Imaging Requests</h2>
                        <p>Newly submitted Orthanc / radiology requests.</p>
                    </div>
                </div>

                <div className="orthanc-dashboard__requests-grid">
                    {recentRequests.map((request) => (
                        <Tile key={request.id} className="orthanc-dashboard__request-card">
                            <div className="orthanc-dashboard__request-top">
                                <div>
                                    <h3>{request.studyType}</h3>
                                    <p className="orthanc-dashboard__patient-name">
                                        {request.patientName} ({request.patientId})
                                    </p>
                                </div>

                                <div className="orthanc-dashboard__tags">
                                    <Tag type="blue">{request.modality}</Tag>
                                    <Tag
                                        type={
                                            request.priority === 'STAT'
                                                ? 'red'
                                                : request.priority === 'Urgent'
                                                    ? 'purple'
                                                    : 'gray'
                                        }
                                    >
                                        {request.priority}
                                    </Tag>
                                    <Tag
                                        type={
                                            request.status === 'Completed'
                                                ? 'green'
                                                : request.status === 'Scheduled'
                                                    ? 'teal'
                                                    : 'warm-gray'
                                        }
                                    >
                                        {request.status}
                                    </Tag>
                                </div>
                            </div>

                            <p>
                                <strong>Body Part:</strong> {request.bodyPart}
                            </p>
                            <p>
                                <strong>Request Date:</strong> {request.requestDate}
                            </p>
                            <p>
                                <strong>Clinical Notes:</strong> {request.clinicalNotes || 'N/A'}
                            </p>
                        </Tile>
                    ))}
                </div>
            </Tile>
        </div>
    );
};

export default OrthancDashboard;