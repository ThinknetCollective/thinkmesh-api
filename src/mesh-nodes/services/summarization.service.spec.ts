import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SummarizationService } from './summarization.service';
import { MeshNode } from '../entities/mesh-node.entity';

describe('SummarizationService', () => {
  let service: SummarizationService;

  const mockRepository = {
    update: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummarizationService,
        {
          provide: getRepositoryToken(MeshNode),
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SummarizationService>(SummarizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create fallback summary when texts provided', async () => {
    const texts = ['This is a solution.', 'Another great solution here.', 'Final solution approach.'];
    const summary = await service['fallbackSummarization'](texts);
    
    expect(summary).toBeDefined();
    expect(summary.length).toBeGreaterThan(0);
  });

  it('should get summary for node', async () => {
    const mockNode = { id: 1, summary: 'Test summary' };
    mockRepository.findOne.mockResolvedValue(mockNode);

    const result = await service.getSummary(1);
    expect(result).toBe('Test summary');
  });
});