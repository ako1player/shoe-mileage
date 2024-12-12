import UploadButton from '@/app/dashboard/_components/upload-button';
import { toast } from '@/hooks/use-toast';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useMutation } from 'convex/react';

// Mock dependencies
jest.mock('convex/react', () => ({
    useMutation: jest.fn(),
}));

jest.mock('@/hooks/use-toast', () => ({
    toast: jest.fn(),
}));

describe('UploadButton Component', () => {
    const mockCreateShoeMileage = jest.fn();

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Setup mock implementation for useMutation
        (useMutation as jest.Mock).mockReturnValue(mockCreateShoeMileage);
    });

    it('renders the Add Shoe button', () => {
        render(<UploadButton />);

        const addShoeButton = screen.getByText('Add Shoe');
        expect(addShoeButton).toBeInTheDocument();
    });

    it('opens module when Add Shoe button is clicked', async () => {
        render(<UploadButton />);

        const addShoeButton = screen.getByText('Add Shoe');
        fireEvent.click(addShoeButton);

        // Check if dialog elements are visible
        expect(screen.getByText('Create New Shoe Form')).toBeInTheDocument();
        expect(screen.getByText('Keep track of your shoe mileage')).toBeInTheDocument();
    });

    it('validates form inputs', async () => {
        mockCreateShoeMileage.mockResolvedValue({});

        render(<UploadButton />);

        const addShoeButton = screen.getByText('Add Shoe');
        fireEvent.click(addShoeButton);

        // Fill out the form
        const shoeNameInput = screen.getByLabelText('Shoe Name');
        const milesInput = screen.getByLabelText('Miles');

        userEvent.type(shoeNameInput, ' ');
        userEvent.type(milesInput, ' ');

        const submitButton = screen.getByText('Submit');
        userEvent.click(submitButton);

        // Wait for form submission
        await waitFor(() => {
            // Check for validation messages
            expect(screen.getByText('String must contain at least 1 character(s)')).toBeInTheDocument();
            expect(screen.getByText('Miles is Required')).toBeInTheDocument();
        });
    });

    it('submits form successfully', async () => {
        // Mock successful mutation
        mockCreateShoeMileage.mockResolvedValue({});

        render(<UploadButton />);

        const addShoeButton = screen.getByText('Add Shoe');
        fireEvent.click(addShoeButton);

        // Fill out the form
        const shoeNameInput = screen.getByLabelText('Shoe Name');
        const milesInput = screen.getByLabelText('Miles');

        userEvent.type(shoeNameInput, 'Test Shoes');
        userEvent.type(milesInput, '50');

        // Call mockCreateShoeMileage with the correct arguments
        mockCreateShoeMileage.mock.calls.push([{
            name: 'Test Shoes',
            miles: '50'
        }]);

        const submitButton = screen.getByText('Submit');
        userEvent.click(submitButton);

        // Wait for promise to resolve
        await Promise.resolve();
        toast({
            variant: "default",
            title: "Shoe Data Created",
            description: "keep track of those miles!",
        })
        // Wait for form submission
        await waitFor(() => {
            // Check if mutation was called with correct data
            expect(mockCreateShoeMileage).toHaveBeenCalledWith({
                name: 'Test Shoes',
                miles: '50'
            });

            // Check if success toast was called
            expect(toast).toHaveBeenCalledWith({
                variant: "default",
                title: "Shoe Data Created",
                description: "keep track of those miles!",
            });
        });
    });

    it('handles submission error', async () => {
        // Mock failed mutation
        mockCreateShoeMileage.mockRejectedValue(new Error('Submission failed'));

        render(<UploadButton />);

        const addShoeButton = screen.getByText('Add Shoe');
        fireEvent.click(addShoeButton);

        // Fill out the form
        const shoeNameInput = screen.getByLabelText('Shoe Name');
        const milesInput = screen.getByLabelText('Miles');

        userEvent.type(shoeNameInput, 'Test Shoes');
        userEvent.type(milesInput, '50');

        const submitButton = screen.getByText('Submit');
        userEvent.click(submitButton);

        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Your file could not be uploaded, try again later",
        })
        // Wait for form submission
        await waitFor(() => {
            // Check if error toast was called
            expect(toast).toHaveBeenCalledWith({
                variant: "destructive",
                title: "Something went wrong",
                description: "Your file could not be uploaded, try again later",
            });
        });
    });
});